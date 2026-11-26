import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderDto{
    @ApiProperty({example: 1, description:'ID Menu yang ingin dipesan'})
    @IsNotEmpty()
    @IsNumber({})
    menuId: number;

    @ApiProperty({example:2, description:'Jumlah porsi yang dipesan'})
    @IsNotEmpty()
    @IsNumber({})
    @Min(1)
    quantity: number;

    @ApiProperty({example:'dine_in', enum:['dine_in', 'takeaway'], description:'Tipe pesanan'})
    @IsNotEmpty()
    @IsEnum(['dine_in','takeaway'])
    orderType:string;
}