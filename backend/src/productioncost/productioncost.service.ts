import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductioncostDto } from './dto/create-productioncost.dto';
import { UpdateProductioncostDto } from './dto/update-productioncost.dto';
import { Productioncost } from './entities/productioncost.entity';

@Injectable()
export class ProductioncostService {
  constructor(
    @InjectRepository(Productioncost)
    private readonly repo: Repository<Productioncost>,
  ) {}

  async create(createProductioncostDto: CreateProductioncostDto) {
    let totalCost =
      createProductioncostDto.biayaVariable < createProductioncostDto.fixedCost
        ? createProductioncostDto.fixedCost
        : createProductioncostDto.biayaVariable;

    const record = this.repo.create(
      Object.assign(createProductioncostDto, { totalCost }),
    );
    return this.repo.save(record);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    try {
      return await this.repo.findOneOrFail(id);
    } catch {
      throw new NotFoundException('Record tidak ditemukan');
    }
  }

  async update(id: number, updateProductioncostDto: UpdateProductioncostDto) {
    const record = await this.findOne(id);

    return this.repo.save({ ...record, ...updateProductioncostDto });
  }

  async remove(id: number) {
    const record = await this.findOne(id);

    return this.repo.remove(record);
  }
}
