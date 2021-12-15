import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductioncostService } from './productioncost.service';
import { CreateProductioncostDto } from './dto/create-productioncost.dto';
import { UpdateProductioncostDto } from './dto/update-productioncost.dto';

@Controller('productioncost')
export class ProductioncostController {
  constructor(private readonly productioncostService: ProductioncostService) {}

  @Post()
  create(@Body() createProductioncostDto: CreateProductioncostDto) {
    return this.productioncostService.create(createProductioncostDto);
  }

  @Get()
  findAll() {
    return this.productioncostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productioncostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductioncostDto: UpdateProductioncostDto) {
    return this.productioncostService.update(+id, updateProductioncostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productioncostService.remove(+id);
  }
}
