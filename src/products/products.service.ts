import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductEdgeBuilder } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Edge } from 'src/types/edge.type';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepo: Repository<Product>,
    private readonly _userService: UsersService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = this._productRepo.create(createProductDto);
    return this._productRepo.save(createdProduct);
  }

  async findAll(first: number, cursor: string) {
    const queryBuilder = this._productRepo.createQueryBuilder('product');
    const productEdgeBuilder = new ProductEdgeBuilder();
    queryBuilder.leftJoinAndSelect('product.user', 'user').limit(first);
    if (cursor) {
      const cursorFromRequest = productEdgeBuilder.readCursor(cursor);
      queryBuilder.where('product.id > :cursor', {
        cursor: cursorFromRequest.productId,
      });
    }

    const products = await queryBuilder.getMany();
    const edges = await productEdgeBuilder.createEdge(products);
    return edges;
  }

  findOne(id: number) {
    return this._productRepo.findBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`no product found by this id: ${id}!`);
    }
    const updatedProduct = Object.assign(product, updateProductDto);
    return this._productRepo.save(updatedProduct);
  }
}
