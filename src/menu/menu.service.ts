import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
    ) { }
    //melihat semua daftar menu
    async findAllMenu(): Promise<Menu[]> {
        return await this.menuRepository.find();
    }
    //menambahkan menu baru
    async createMenu(category: string, name: string, price: number, description: string): Promise<Menu> {
        const newMenu = await this.menuRepository.create({ category, name, price, description });
        return await this.menuRepository.save(newMenu);
    }
    //mencari menu berdasarkan ID (validasi Order)
    async findMenuId(id: number): Promise<Menu> {
        const menu = await this.menuRepository.findOne({ where: { id } });
        if (!menu) {
            throw new NotFoundException(`Menu dengan ID ${id} tidak ditemukan`);
        }
        return menu;
    }
    //mengupdate menu
    async updateMenu(id:number, updateData:Partial<Menu>): Promise<Menu>{
        //memastikan menu berdasarkna id
        const menu = await this.findMenuId(id);
        //menggabungkan data lama dengan data baru
        Object.assign(menu, updateData);
        return await this.menuRepository.save(menu);
    }
    //menghspus berdasarkan id 
    async remove(id: number) {
        return this.menuRepository.delete(id);
    }
}
