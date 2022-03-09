export default class CommonPaginationResponseDto {
  constructor(
    items: any[],
    pagination: {
      count: number;
      pageSize: number;
      page: number;
    } | null,
  ) {
    this.items = items;
    this.pagination = pagination || null;
  }
  items: any[];
  pagination: {
    count: number;
    pageSize: number;
    page: number;
  } | null;
}
