import { IsOptional, IsNumber } from 'class-validator';

export class CreateProductioncostDto {
  @IsNumber()
  kuantitasProduksi: number;

  @IsNumber()
  biayaVariable: number;

  @IsNumber()
  fixedCost: number;

  @IsOptional()
  @IsNumber()
  totalCost: number;

  @IsOptional()
  @IsNumber()
  marginalCost: number;
}
