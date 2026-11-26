import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../order/orders.entity";

@Entity('menu')
export class Menu{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})//memastikan tidak ada data yang sama
    name: string;

    @Column('decimal')
    price: number;
    
    @Column({nullable: true})//boleh kosong
    description: string;

    @Column()
    category: string;//category makanan: makanan, minuman, snack

    @Column({default:true})
    isAvailable: boolean;//Status menu

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;
    
    @OneToMany(()=>Order,(order)=>order.menu)//relasi ke tabel Order
    orders:Order[];
}