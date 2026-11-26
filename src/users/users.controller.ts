import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
   constructor(private readonly userService: UsersService) { }

   //melihat semua daftar user
   @Get()
   @UseGuards(JwtAuthGuard)
   @ApiOperation({ summary: 'Mendapatkan semua daftar user' })
   async findAll(): Promise<User[]> {
      return await this.userService.findAllUsers();
   }
   //mendaftarkan user baru
   @Post('register')
   @ApiOperation({ summary: 'Registrasi user baru' })
   async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.createUser(createUserDto);
   }
   //mengupdate atau mengubah profil user
   @Patch(':id')
   @ApiOperation({ summary: 'Update data user berdasarkan ID' })
   async update(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto,
   ): Promise<User> {
      return await this.userService.updateUser(+id, updateUserDto);
   }
   //menghapus user 
   @Delete(':id')
   @ApiOperation({ summary: 'Hapus user berdasarkan ID' })
   async remove(@Param('id') id: string): Promise<{ message: string }> {
      return await this.userService.removeUser(+id)
   }
}
