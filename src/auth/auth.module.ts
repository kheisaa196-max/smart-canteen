import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: 'kheisha', 
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
