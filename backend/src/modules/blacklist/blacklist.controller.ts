import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlacklistService } from './blacklist.service';
import { Response } from 'express';
import { BlacklistDTO, UpdateBlacklistDTO } from './blacklist.dto';

@ApiTags('blaclist')
@Controller('blacklist')
export class BlacklistController {
    constructor(private readonly blacklistService: BlacklistService) { }

    @Get()
    async get(@Res() res: Response) {
        try {
            const data = await this.blacklistService.get()
            return res.status(200).json({ message: "Berhasil menampilkan booking", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Get(':id')
    async getId(@Param('id') id: string, @Res() res: Response) {
        try {
            const data = await this.blacklistService.getId(id)
            return res.status(200).json({ message: "Berhasil menampilkan booking", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Post()
    async create(@Body() payload: BlacklistDTO, @Res() res: Response) {
        try {
            const data = await this.blacklistService.create(payload);
            return res.status(200).json({ message: "Berhasil menambahkan booking", data });
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                console.log(error)
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: UpdateBlacklistDTO, @Res() res: Response) {
        try {
            const data = await this.blacklistService.update(id, payload)
            return res.status(200).json({ message: "Berhasil memperbarui booking", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.blacklistService.delete(id)
            return res.status(200).json({ message: "Berhasil menghapus booking", data: {} })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }
}
