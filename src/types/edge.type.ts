export interface Edge<T> {
  node: T;
  cursor: string;
}

export interface EdgeBuilderInterface<T, CursorType> {
  node: T;
  cursor: string;
  createCursor: (data: CursorType) => string;
  readCursor: (cursor: string) => CursorType;
  createEdge: (nodes: T[]) => Promise<Edge<T>[]>;
}
// export abstract class EdgeBuilder {
//   public static buildEdgeClass<T>(classRef: Type<T>) {
//     abstract class EdgeType implements Edge<T> {
//       public node: T;
//       public cursor: string;
//     }
//     return EdgeType as Type<Edge<T>>;
//   }

//   public static createEdge<T>(ndoes: T[]): Promise<Edge<T>[]> {
//     return Promise.all(
//       ndoes.map((node) => {
//         const cursor = EdgeBuilder.createCursor(
//           EdgeBuilder.getCursorData(node),
//         );
//         return <Edge<T>>{ node, cursor };
//       }),
//     );
//   }

//   protected abstract getCursorData<T>(node: T): string;

//   static createCursor(data: string): string {
//     return Buffer.from(data).toString('base64');
//   }

//   static readCursor(cursor: string): string {
//     return Buffer.from(cursor, 'base64').toString('utf8');
//   }
// }
