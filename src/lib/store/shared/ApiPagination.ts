export interface ApiPaginationParams<T> {
  page?: number;
  search?: string;
  filters?: T;
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
