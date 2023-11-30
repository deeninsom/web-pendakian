import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Kuotas from './kuota.entity';
import { KuotaDTO } from './kuota.dto';

@Injectable()
export class KuotaService {
    constructor(
        @InjectRepository(Kuotas)
        private kuotaRepository: Repository<Kuotas>,
    ) { }

    async get(search: string) {
        const whereCondition: any = {}

        if (search) {
            whereCondition.tanggal = Like(`%${search}%`);
        }

        const data = await this.kuotaRepository.find({
            where: whereCondition,
            order: { created_at: "ASC" }
        });

        return data;
    }

    async getId(id: string) {
        const findBooking = await this.kuotaRepository.findOne({
            where: { id }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findBooking
    }

    async create(kuotaDTO: KuotaDTO): Promise<any> {
        const findKuota = await this.kuotaRepository.find({
            where: {
                tanggal: Like(`%${kuotaDTO.year}-${kuotaDTO.month}%`)
            }
        })

        if (findKuota.length > 0) {
            throw new HttpException(`Kuota sudah ada !`, HttpStatus.CONFLICT)
        }

        const payload: any = kuotaDTO
        const currentYear = payload.year;
        const daysInMonth = new Date(currentYear, payload.month, 0).getDate();

        const result = []

        for (let day = 1; day <= daysInMonth; day++) {
            const formattedDate = `${currentYear}-${payload.month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const existingKuota = await this.kuotaRepository.findOne({
                where: {
                    tanggal: formattedDate,
                },
            });

            if (!existingKuota) {
                const newKuota = this.kuotaRepository.create({
                    tanggal: formattedDate,
                    kuota: 150,
                });

                const createKuota = await this.kuotaRepository.save(newKuota);
                result.push(createKuota)
            }
        }

        return result
    }

    async update(id: string, payload: any) {
        const findBooking = await this.kuotaRepository.findOne({
            where: { id }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.kuotaRepository.save(payload)
        return await this.kuotaRepository.findOne({ where: { id: findBooking.id } })
    }

    async delete(id: string): Promise<void> {
        const findBooking = await this.kuotaRepository.findOne({
            where: { id: id }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.kuotaRepository.delete(findBooking)
    }
}
