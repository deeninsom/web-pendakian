import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

