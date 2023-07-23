import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ConnectionBuilder } from 'src/types/builder/connection.builder';
import { Connection } from 'src/types/connection.type';
import { ConnectionEdge } from 'src/types/edge.type';
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

export type ProductCursorData = {
  id: number;
};

export class ProductEdge extends ConnectionEdge<Product> {}

export class ProductConnection extends Connection<Product, ProductEdge> {}

export class ProductConnectionBuilder extends ConnectionBuilder<
  ProductConnection,
  ProductEdge,
  Product,
  ProductCursorData
> {
  protected getCursorData(node: Product): ProductCursorData {
    return { id: node.id };
  }

  protected isValidCursorData(data: unknown): boolean {
    return (
      'id' in (data as ProductCursorData) &&
      typeof (data as ProductCursorData)?.id === 'number'
    );
  }

  protected getCursorDataError(name: 'after' | 'before', value: string): Error {
    return new Error(
      `cursor in argument ${name} has an invalide value of ${value}`,
    );
  }
}
