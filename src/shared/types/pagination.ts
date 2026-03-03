export interface PageInfo {
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface BasePaginationParams {
  page: number;
  size: number;
  searchWord?: string;
}
