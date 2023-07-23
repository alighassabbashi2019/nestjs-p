import { Bounds } from './bounds.interface';
import { Pager } from './pager.interface';

export interface Pagination {
  totalEdges: number;
  pager: null | Pager;
  bounds: Bounds;
}
