import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
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

  findAll() {
    return this._productRepo.find({
      relations: {
        user: true,
      },
    });
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
