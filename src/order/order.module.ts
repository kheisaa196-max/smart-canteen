import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Menu } from '../menu/menu.entity';
import { User } from '../users/users.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Order, User, Menu])],
    providers:[OrderService],
    controllers:[OrderController],
})
export class OrderModule {}
