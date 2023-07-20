import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends OmitType(Product, ['id']) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
