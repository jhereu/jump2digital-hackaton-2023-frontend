export interface ApiPaginationParams<T> {
  page?: number;
  filter?: T;
}

export interface ApiPaginationResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}
