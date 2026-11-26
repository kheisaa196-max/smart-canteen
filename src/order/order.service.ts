import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Menu } from '../menu/menu.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
    ) { }

async findAllOrders(): Promise<Order[]>{
    return await this.orderRepository.find({
        relations: {'user':true, 'menu':true}, 
        order:{createdAt:'DESC'}
    });
}

async findOrderByUser(userId: number):Promise<Order[]>{
    return await this.orderRepository.find({
    where:{user:{id:userId}},
    relations:{'menu':true},
    order:{createdAt:'DESC'}
    })
    }
    async createOrder(userId: number,createOrderDto:CreateOrderDto): Promise<Order> { 
        const{menuId,quantity,orderType}=createOrderDto
        //memeriksa user
        const user = await this.userRepository.findOne({where: {id:userId}});
        if(!user){
            throw new NotFoundException(`User dengan ID ${userId} tidak ditemukan`)
        }
        //memeriksa menu
        const menu = await this.menuRepository.findOne({where: {id:menuId}});
        if(!menu){
            throw new NotFoundException(`Menu dengan ID ${menuId} tidak ditemukan`)
        }
        if(!menu.isAvailable){
            throw new BadRequestException(`Menu "${menu.name}" sedang tidak tersedia`)
        }
        //Hitung total harga
        const totalPrice= Number(menu.price)*quantity
        //membuat dan menyimpan pesanan baru ke database
        const newOrder= this.orderRepository.create({
            quantity,
            totalPrice,
            orderType,
            status:'pending',
            user:{id:userId} as User,
            menu: menu
        });
        return await this.orderRepository.save(newOrder);
    }

    async updateOrderStatus(id:number, status:string):Promise<Order>{
        const order = await this.orderRepository.findOne({where:{id}})
        if(!order){
            throw new NotFoundException(`Pesanan dengan ID ${id} tidak ditemukan`)
        }
        order.status=status;
        return await this.orderRepository.save(order)
    }
}
