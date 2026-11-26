import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true, type: 'varchar', length: 100})
    name: string;

    @Column({type:'varchar', length: 100, unique: true})
    email:string;

    @Column({type: 'varchar'})
    password: string;//password hash

    @Column({type:'varchar', default:'student'})
    role: string;//role sebagai admin/student/teacher

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}