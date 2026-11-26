import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }
    //registrasi user baru
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password, role } = createUserDto;
        //memeriksa email
        const existingUser = await this.userRepository.findOne({ where: { email } })
        if (existingUser) {
            throw new ConflictException('Email sudah terdaftar');
        }
        //hash passowrd
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //objek user
        const newUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            role:role ||'student',
        })
        return await this.userRepository.save(newUser);
    }
    //melihat semua daftar user
    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }
    //mengupdate atau mengubah user 
    async updateUser(id:number, updateUserDto:UpdateUserDto):Promise<User>{
        const user = await this.userRepository.findOne({where:{id}});
        if(!user){
            throw new ConflictException('User tidak ditemukan');
        }
        //menghash ulang password baru
        if(updateUserDto.password){
            const saltRounds=10;
            updateUserDto.password= await bcrypt.hash(updateUserDto.password,saltRounds);
        }
        //menggabungkan data lama dengan data baru
        Object.assign(user,updateUserDto);
        return await this.userRepository.save(user);
    }
    //menghapus user berdasarkan id
    async removeUser(id:number):Promise<{message:string}>{
        const user = await this.userRepository.findOne({where:{id}});
        if(!user){
            throw new ConflictException('User tidak ditemukan')
        }
        await this.userRepository.remove(user);
        return{message: `User dengan ID ${id} berhasil dihapus`};
    }
}
