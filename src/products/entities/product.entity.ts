import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Edge, EdgeBuilderInterface } from '../../types/edge.type';
import { stringify } from 'querystring';

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

export class ProductEdgeBuilder
  implements
    EdgeBuilderInterface<Product, { productId: number; title: string }>
{
  node: Product;
  cursor: string;

  createCursor(data: { productId: number; title: string }) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  readCursor(cursor: string) {
    const stringifiedJson = Buffer.from(cursor, 'base64').toString('utf8');
    return JSON.parse(stringifiedJson) as { productId: number; title: string };
  }

  createEdge(nodes: Product[]): Promise<Edge<Product>[]> {
    return Promise.all(
      nodes.map((node) => {
        const cursor = this.createCursor({
          productId: node.id,
          title: node.title,
        });
        return <Edge<Product>>{ node, cursor };
      }),
    );
  }
}
