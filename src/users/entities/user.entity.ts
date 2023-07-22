import { IsString, Min } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { Edge, EdgeBuilderInterface } from 'src/types/edge.type';
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

export class UserEdgeBuilder
  implements EdgeBuilderInterface<User, { id: string }>
{
  node: User;
  cursor: string;

  createCursor(data: { id: string }) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  readCursor(cursor: string) {
    const stringifiedJson = Buffer.from(cursor, 'base64').toString('utf8');
    return JSON.parse(stringifiedJson) as { id: string };
  }

  createEdge(nodes: User[]): Promise<Edge<User>[]> {
    return Promise.all(
      nodes.map((node) => {
        const cursor = this.createCursor({
          id: node.id,
        });
        return <Edge<User>>{ node, cursor };
      }),
    );
  }
}
