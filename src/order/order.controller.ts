import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './orders.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdatdateOrderStatusDto } from './dto/update-order.dto';

@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private readonly OrderService: OrderService) { }

    //melihat semua daftar pesanan
    @Get()
    async findAll(): Promise<Order[]> {
        return await this.OrderService.findAllOrders();
    }
    //membuat pesanan
@Post()
    async create(
        @Req() req: any,
        @Body() createOrderDto: CreateOrderDto, 
    ): Promise<Order> {
        const userId = req.user.userId;
        return await this.OrderService.createOrder(userId, createOrderDto);
    }

    //melihat riwayat milik user yang sedang login
    @Get('my-orders')
    async findMyOrders(@Req() req: any): Promise<Order[]> {
        const userId = req.user.userId;
        return await this.OrderService.findOrderByUser(userId);
    }
    //mengubah status
    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBody({type:UpdatdateOrderStatusDto})
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ): Promise<Order> {
        return await this.OrderService.updateOrderStatus(+id, status)
    }
}
