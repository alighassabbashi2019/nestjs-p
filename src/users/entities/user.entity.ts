import { IsString, Min } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Min(8)
  username: string;

  @Column()
  @IsString()
  @Min(8)
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
