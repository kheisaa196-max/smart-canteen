import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateMenuDto } from "../../menu/dto/create-menu.dto";

export class UpdateMenuDto extends PartialType(CreateMenuDto){
    @ApiProperty({example:'Nasi Goreng spesial Extra Telur', required: false})
    name?: string;

    @ApiProperty({example: 18000, required: false})
    price?: number;
    
    @ApiProperty({example: 'Makanan Berat', required: false})
    category?: string;

    @ApiProperty({example:'Bumbu spesial dengan tambahan telur ceplok', required: false})
    description?: string;

}