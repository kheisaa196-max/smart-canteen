import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto){
    @ApiProperty({example:'kheisha khusna', required: false})
    name?: string;

    @ApiProperty({example:'khusna@example.com', required:false})
    email?: string;

    @ApiProperty({example:'passwordbaru1234', required:false})
    password?: string;

    @ApiProperty({example:'admin', required:false})
    role?: string;
}