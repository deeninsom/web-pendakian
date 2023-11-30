import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Bookings from './booking.entity';
import { BookingDTO } from './booking.dto';
import { LessThan } from 'typeorm';
import Kuotas from '../kuota/kuota.entity';
import Blacklists from '../blacklist/blacklist.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Bookings)
        private bookingRepository: Repository<Bookings>,

        @InjectRepository(Kuotas)
        private kuotaRepository: Repository<Kuotas>,

        @InjectRepository(Blacklists)
        private blacklistRepository: Repository<Blacklists>,
    ) { }

    async get(search: string, date: string, status: string) {
        const whereCondition: any = {}

        if (search) {
            whereCondition.kode_booking = Like(`%${search}%`);
        }

        if (date) {
            whereCondition.tanggal_naik = Like(`%${date}%`);
        }

        if (status) {
            whereCondition.status = Like(`%${status}%`);
        }

        const result = await this.bookingRepository.find({
            where: whereCondition,
            order: { created_at: "DESC" }
        });
        return result
    }

    async getId(id: string): Promise<Bookings> {
        const findBooking = await this.bookingRepository.findOne({
            where: { id }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findBooking
    }

    async create(bookingDTO: BookingDTO): Promise<any> {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const newKodeBooking = `PNG-${formattedDate}-${randomDigits}`;

        bookingDTO.kode_booking = newKodeBooking
        const createPayload = this.bookingRepository.create(bookingDTO)
        const findKuota = await this.kuotaRepository.findOne({
            where: {
                tanggal: Like(`%${bookingDTO.tanggal_naik}%`)
            }
        })

        if (findKuota) {
            if (findKuota.kuota < 1) {
                throw new HttpException(
                    `Kuota telah habis`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            findKuota.kuota = findKuota.kuota - 1
            await this.kuotaRepository.save(findKuota)
        }


        const checkKetua = await this.checkBlacklist(bookingDTO.no_identitas_ketua)
        if (checkKetua) {
            throw new HttpException(
                `Ketua with name ${bookingDTO.nama_ketua} is blacklisted`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const dataAnggota: any = bookingDTO.anggota

        for (const anggota of dataAnggota) {
            const checkAnggota = await this.checkBlacklist(anggota.no_identitas_anggota)

            if (checkAnggota) {
                throw new HttpException(
                    `Anggota with name ${anggota.nama} is blacklisted`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const createBooking = await this.bookingRepository.save(createPayload);
            return createBooking
        }
    }

    async update(id: string, payload: any): Promise<Bookings> {
        const findBooking = await this.bookingRepository.findOne({
            where: { id }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.bookingRepository.save(payload)
        return await this.bookingRepository.findOne({ where: { id: findBooking.id } })
    }

    async delete(id: string): Promise<void> {
        const findBooking = await this.bookingRepository.findOne({
            where: { id: id }
        });

        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.bookingRepository.delete(findBooking.id)
    }

    async submitUp(payload: any) {
        const findBooking = await this.bookingRepository.findOne({
            where: {
                id: payload.booking_id
            }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${payload.booking_id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        findBooking.naik = payload.naik
        findBooking.turun = payload.turun
        await this.bookingRepository.update(findBooking.id, findBooking);

        return findBooking
    }

    async handleStatus(payload: any) {
        const findBooking = await this.bookingRepository.findOne({
            where: {
                id: payload.booking_id
            }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${payload.booking_id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        findBooking.status = payload.status
        await this.bookingRepository.update(findBooking.id, findBooking);

        return findBooking
    }

    async handleImagePayment(payload: any) {
        const findBooking = await this.bookingRepository.findOne({
            where: {
                id: payload.booking_id
            }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${payload.booking_id} tidak ditemukan !`, HttpStatus.NOT_FOUND)


        findBooking.bukti_pembayaran = payload.bukti_pembayaran
        await this.bookingRepository.update(findBooking.id, findBooking);

        return findBooking
    }

    async deleteBookingsCreatedBefore(date: Date): Promise<void> {
        const data = await this.bookingRepository.delete({ created_at: LessThan(date) });
        console.log(data)
    }

    private async checkBlacklist(id: string): Promise<boolean> {
        if (!id) {
          return true;
        }
      
        const isBlacklisted = await this.blacklistRepository.findOne({
          where: {
            nik: id,
          },
        });
      
        return !!isBlacklisted; 
      }
}
