export interface Edge<T> {
  node: T;
  cursor: string;
}

export interface EdgeBuilderInterface<T, CursorType> extends Edge<T> {
  createCursor: (data: CursorType) => string;
  readCursor: (cursor: string) => CursorType;
  createEdge: (nodes: T[]) => Promise<Edge<T>[]>;
}
