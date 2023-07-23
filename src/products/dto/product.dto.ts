import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Product } from '../entities/product.entity';
import { ConnectionArgs } from 'src/types/args.type';

export class CreateProductDto extends OmitType(Product, ['id']) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductConnectionArgs extends ConnectionArgs {}
