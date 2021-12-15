import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductioncostService } from './productioncost.service';
import { ProductioncostController } from './productioncost.controller';
import { Productioncost } from './entities/productioncost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productioncost])],
  controllers: [ProductioncostController],
  providers: [ProductioncostService],
})
export class ProductioncostModule {}
