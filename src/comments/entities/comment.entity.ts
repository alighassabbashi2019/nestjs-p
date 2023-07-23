import { Edge, EdgeBuilderInterface } from 'src/types/edge.type';
import { CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
@Index(['userId', 'productId', 'createAt'], { unique: true, spatial: true })
export class Comment {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  @CreateDateColumn()
  createAt: Date;
}

export class CommentEdgeBuilder
  implements
    EdgeBuilderInterface<
      Comment,
      { userId: string; productId: number; createAt: Date }
    >
{
  node: Comment;
  cursor: string;

  createCursor(data: { userId: string; productId: number; createAt: Date }) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  readCursor(cursor: string) {
    const stringifiedJson = Buffer.from(cursor, 'base64').toString('utf8');
    return JSON.parse(stringifiedJson) as {
      userId: string;
      productId: number;
      createAt: Date;
    };
  }

  createEdge(nodes: Comment[]): Promise<Edge<Comment>[]> {
    return Promise.all(
      nodes.map((node) => {
        const cursor = this.createCursor({
          userId: node.userId,
          productId: node.productId,
          createAt: node.createAt,
        });
        return <Edge<Comment>>{ node, cursor };
      }),
    );
  }
}
