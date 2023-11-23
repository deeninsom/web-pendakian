/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebsiteDTO } from './website.dto';
import Websites from './website.entity';

@Injectable()
export class WebsiteService {
    constructor(
        @InjectRepository(Websites)
        private websiteRepository: Repository<Websites>,
    ) { }

    async get() {
        const result = await this.websiteRepository.find();
        return result
    }

    async getId(id: string): Promise<any> {
        const findWebsite = await this.websiteRepository.findOne({
            where: { id }
        });
        if (!findWebsite) throw new HttpException(`Website dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findWebsite
    }

    async create(payload: WebsiteDTO): Promise<any> {
        const kuota: any = this.websiteRepository.create(payload)
        const createKuota = await this.websiteRepository.save(kuota);
        return createKuota
    }

    async update(id: string, payload: any): Promise<WebsiteDTO> {
        const findWebsite = await this.websiteRepository.findOne({
            where: { id }
        });
        if (!findWebsite) throw new HttpException(`Website dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.websiteRepository.update(findWebsite.id, payload)
        return await this.websiteRepository.findOne({ where: { id: findWebsite.id } })
    }

    async delete(id: string): Promise<void> {
        const findWebsite = await this.websiteRepository.findOne({
            where: { id: id }
        });
        if (!findWebsite) throw new HttpException(`Website dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.websiteRepository.delete(findWebsite)
    }
}
