import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = this._userRepo.create(createUserDto);
    return this._userRepo.save(createdUser);
  }

  findAll() {
    const qb = this._userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.products', 'products');
    return qb.getMany();
  }

  findOne(id: string) {
    return this._userRepo.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('no user found by this id!');
    }
    Object.assign(user, updateUserDto);
    return this._userRepo.save(user);
  }
}
