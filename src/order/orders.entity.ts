import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "../menu/menu.entity";
import { User } from '../users/users.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (users) => users.id, { eager: true })
    user: User;

    @ManyToOne(() => Menu, (menu) => menu.id, { eager: true })
    menu: Menu;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number; //Total harga (quantity*harga menu)

    @Column({default:'pending'})
    status:string;//Status pesanan : pending, processing, complete
    
    @Column({ type: 'enum', enum: ['dine_in', 'takeaway'] })
    orderType: string;

    @CreateDateColumn()
    createdAt: Date;
}