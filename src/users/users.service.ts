import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserEdgeBuilder } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = this._userRepo.create(createUserDto);
    return this._userRepo.save(createdUser);
  }

  async findAll(first: number, cursor: string) {
    const qb = this._userRepo
      .createQueryBuilder('user')
      .orderBy({ id: 'ASC' })
      .limit(first);
    const userEdgeBuilder = new UserEdgeBuilder();
    if (cursor) {
      qb.where('user.id > :cursor', {
        cursor: userEdgeBuilder.readCursor(cursor).id,
      });
    }
    const users = await qb.getMany();
    return userEdgeBuilder.createEdge(users);
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
