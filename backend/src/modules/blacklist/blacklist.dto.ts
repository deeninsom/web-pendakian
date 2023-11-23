import { IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BlacklistDTO {
    @ApiProperty()
    nik: string;

    @ApiProperty()
    nama: string;

    @ApiProperty()
    no_telepon: string;

    @ApiProperty()
    dibuat: string;

    @ApiProperty()
    berakhir: string;
}

export class UpdateBlacklistDTO {
    @ApiProperty()
    @IsOptional()
    nik: string;

    @ApiProperty()
    @IsOptional()
    nama: string;

    @ApiProperty()
    @IsOptional()
    no_telepon: string;

    @ApiProperty()
    @IsOptional()
    dibuat: string;

    @ApiProperty()
    @IsOptional()
    berakhir: string;
}

