import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMenuDto{
    @ApiProperty({example: 'Nasi Goreng Spesial'})
    @IsNotEmpty({message:'Nama menu tidak boleh kosong'})
    @IsString()
    name: string;

    @IsNotEmpty({message:'Harga tidak boleh kosong'})
    @IsNumber({},{message: 'Harga harus berupa angka'})
    @ApiProperty({example: 15000})
    price: number;

    @IsNotEmpty({message:'kategori tidak boleh kosong'})
    @IsString()
    @ApiProperty({example:'Makanan'})
    category: string;

    @IsOptional()
    @IsString()
    @ApiProperty({example:'Nasi Goreng dengan telur ceplok'})
    description?: string;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}