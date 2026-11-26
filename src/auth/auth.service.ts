import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    // Validasi user dan password
    async validateUser(email: string, pass: string): Promise<any> {
        // Mencari user berdasarkan email
        const users = await this.userService.findAllUsers();
        const user = users.find((u) => u.email == email);

        // Amankan user tidak ada atau password di database kosong/null
        if (!user || !user.password || !pass) {
            return null;
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password, ...result } = user;
            return result; // Mengembalikan data tanpa password
        } 

        return null;
    }

    // Login dan menghasilkan token JWT
    async login(user: any) {
        if (!user) {
            throw new UnauthorizedException('Email atau password salah');
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
}