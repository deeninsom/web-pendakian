import { IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AnggotaDTO {
    @ApiProperty()
    nama: string;

    @ApiProperty()
    no_identitas_anggota: string;

    @ApiProperty()
    no_telepone: string;

    @ApiProperty()
    alamat: string;

    @ApiProperty()
    jenis_kelamin: string;

}

export class BookingDTO {
    @ApiProperty()
    kode_booking: string;

    @ApiProperty()
    jalur: string;

    @ApiProperty()
    tanggal_naik: string;

    @ApiProperty()
    tanggal_turun: string;

    @ApiProperty()
    nama_ketua: string;

    @ApiProperty()
    alamat_ketua: string;

    @ApiProperty()
    no_identitas_ketua: string;

    @ApiProperty()
    no_telepone_ketua: string;

    @ApiProperty()
    tempat_lahir_ketua: string;

    @ApiProperty()
    tanggal_lahir_ketua: string;

    @ApiProperty()
    jenis_kelamin_ketua: string;

    @ApiProperty()
    no_kontak_darurat_ketua: string;

    @ApiProperty({ type: [AnggotaDTO] })
    anggota: JSON;

    @ApiProperty()
    tarif: number;

    @ApiProperty()
    rombongan: number;

    @ApiProperty()
    @IsOptional()
    total_hari: number;
}


export class QueryBookingto {
    @ApiProperty({
        description: 'find By search',
        required: false
    })
    @IsOptional()
    search?: string

    @ApiProperty({
        description: 'find By status verifikasi',
        required: false
    })
    @IsOptional()
    filterDate?: string

    @ApiProperty({
        description: 'find By status seleksi',
        required: false
    })
    @IsOptional()
    status?: string
}

export class StatusPendakianBookingto {
    @ApiProperty({
        description: 'find By search',
        required: false
    })
    @IsOptional()
    status_pendakian?: string

    @ApiProperty({
        description: 'find By search',
        required: false
    })
    @IsOptional()
    booking_id?: string
}