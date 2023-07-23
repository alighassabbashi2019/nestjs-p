export interface ConnectionEdge<T> {
  node: T;
  cursor: string;
}

export abstract class ConnectionEdge<T> implements ConnectionEdge<T> {
  node: T;
  cursor: string;
}
