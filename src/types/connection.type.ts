import { ConnectionEdge } from './edge.type';
import { PageInfo } from './page-info.type';

export interface Connection<T, E extends ConnectionEdge<T>> {
  readonly pageInfo: PageInfo;
  readonly edges: E[];
}

export class Connection<T, E> implements Connection<T, E> {
  public readonly pageInfo: PageInfo;
  public readonly edges: E[];
}
