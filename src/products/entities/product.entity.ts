import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNumber()
  inStock: number;

  @Column()
  @IsUUID()
  userId: string;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn()
  user: User;
}
