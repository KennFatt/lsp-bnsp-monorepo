import { PartialType } from '@nestjs/mapped-types';
import { CreateProductioncostDto } from './create-productioncost.dto';

export class UpdateProductioncostDto extends PartialType(CreateProductioncostDto) {}
