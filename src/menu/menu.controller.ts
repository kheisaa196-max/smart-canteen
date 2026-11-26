import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menu')
@ApiTags('menu')
@ApiBearerAuth()
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    //melihat semua menu
    @Get()
    @ApiOperation({summary: 'Mendapatkan semua daftar menu'})
    async findAll(): Promise<Menu[]> {
        return await this.menuService.findAllMenu();
    }
    // menambahkan menu baru
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Tambah menu makanan baru'})
    @ApiBody({type:CreateMenuDto})
    async create(
        @Body('category')category:string,
        @Body('name') name: string,
        @Body('price') price: number,
        @Body('description') description: string,
    ): Promise<Menu> {
        return await this.menuService.createMenu(category, name, price, description);
    }
    //mengupdate atau mengubah menu berdasarkan ID
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:'Update data menu berdasarkan ID'})
    async update(
        @Param('id')id: number,
        @Body() updateMenuDto:UpdateMenuDto,
    ):Promise<Menu>{
        return await this.menuService.updateMenu(+id, updateMenuDto)
    }
    //menghapus menu 
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:'Hapus menu berdasarkan ID'})
    remove(@Param('id') id: string){
        return this.menuService.remove(+id);
    }
}
