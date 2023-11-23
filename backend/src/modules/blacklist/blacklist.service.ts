/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistDTO } from './blacklist.dto';
import Blacklists from './blacklist.entity';

@Injectable()
export class BlacklistService {
    constructor(
        @InjectRepository(Blacklists)
        private blacklistRepository: Repository<Blacklists>,
    ) { }

    async get() {
        const result = await this.blacklistRepository.find();
        return result
    }

    async getId(id: string): Promise<any> {
        const fondBlacklist = await this.blacklistRepository.findOne({
            where: { id }
        });
        if (!fondBlacklist) throw new HttpException(`Blacklist dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return fondBlacklist
    }

    async create(payload: BlacklistDTO): Promise<any> {
        const kuota: any = this.blacklistRepository.create(payload)
        const createKuota = await this.blacklistRepository.save(kuota);
        return createKuota
    }

    async update(id: string, payload: any): Promise<BlacklistDTO> {
        const fondBlacklist = await this.blacklistRepository.findOne({
            where: { id }
        });
        if (!fondBlacklist) throw new HttpException(`Blacklist dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.blacklistRepository.update(fondBlacklist.id, payload)
        return await this.blacklistRepository.findOne({ where: { id: fondBlacklist.id } })
    }

    async delete(id: string): Promise<void> {
        const fondBlacklist = await this.blacklistRepository.findOne({
            where: { id: id }
        });
        if (!fondBlacklist) throw new HttpException(`Blacklist dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.blacklistRepository.delete(fondBlacklist)
    }
}
