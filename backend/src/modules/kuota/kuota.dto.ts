import { ApiProperty } from "@nestjs/swagger";

export class KuotaDTO {
    @ApiProperty()
    month: number

    @ApiProperty()
    year: number
}

