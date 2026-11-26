import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Kheisha Khusna', description: 'Nama Lengkap user' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'kheisha@example.com', description: 'Email user' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'password123'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6,{message:'Password minimal 6 karakter'})
    password: string;

    @ApiProperty({example: 'student', required: false})
    @IsString()
    role?: string;
}