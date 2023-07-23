export class PageInfo {
  public readonly hasPreviousPage!: boolean;

  public readonly hasNextPage!: boolean;

  public readonly startCursor!: string;

  public readonly endCursor!: string;

  public readonly totalEdges!: number;

  public readonly edgesPerPage?: number;

  public readonly totalPages?: number;

  public readonly page?: number;
}
