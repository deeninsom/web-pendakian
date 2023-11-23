import { ApiProperty } from "@nestjs/swagger";

export class WebsiteDTO {
    @ApiProperty()
    status_pendaftaran: boolean;
}

