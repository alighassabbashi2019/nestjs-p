import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import {
  CreateProductDto,
  ProductConnectionArgs,
  UpdateProductDto,
} from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductConnectionBuilder } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepo: Repository<Product>,
    private readonly _userService: UsersService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const createdProduct = this._productRepo.create(createProductDto);
    return this._productRepo.save(createdProduct);
  }

  async findAll(args: ProductConnectionArgs) {
    console.log(args);

    const queryBuilder = this._productRepo.createQueryBuilder('product');
    const maxEdgesToReturn = 10;
    const productConnectionBuilder = new ProductConnectionBuilder(
      args,
      maxEdgesToReturn,
    );
    const { after, before } = productConnectionBuilder;
    console.log(after, before);

    if (after || before)
      queryBuilder.where(`product.id ${after ? '>' : '<'} :cursor`, {
        cursor: after ? after : before,
      });
    const totalEdges = await queryBuilder.getCount();
    const { skip, take } = productConnectionBuilder.getBounds(totalEdges);
    queryBuilder.limit(take);
    const products = await queryBuilder.getMany();
    return productConnectionBuilder.build(products, totalEdges);
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
