import { SelectQueryBuilder } from 'typeorm';
import { PaginationOptions } from '../types/pagination-options';
import CommonPaginationResponseDto from '../dto/common-pagination.response.dto';

export const paginate = async (
  query: SelectQueryBuilder<any>,
  paginationOptions: PaginationOptions,
  sortOptions: { isDesc: any; sortBy: string },
  ResponseDto: any,
) => {
  let pagination;
  if (sortOptions) {
    const { sortBy, isDesc } = sortOptions;
    if (sortBy) {
      query.orderBy(sortBy, isDesc ? 'DESC' : 'ASC');
    }
  }
  if (paginationOptions) {
    const { page, pageSize } = paginationOptions;
    if (page && pageSize) {
      const count = await query.getCount();
      query.skip((page - 1) * pageSize);
      query.take(pageSize);
      pagination = {
        count,
        pageSize,
        page,
      };
    }
  }
  const result = await query.getMany();
  const parsedResult = result.map((item) => new ResponseDto(item));
  return new CommonPaginationResponseDto(parsedResult, pagination);
};
