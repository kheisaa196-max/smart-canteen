import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatdateOrderStatusDto{
    @ApiProperty({example: 'PROCESSING', description:'Status baru pesanan'})
    @IsString()
    @IsNotEmpty()
    status:string;
}