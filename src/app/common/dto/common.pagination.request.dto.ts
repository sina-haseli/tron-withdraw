import { IsNumberString, IsOptional } from 'class-validator';

export class CommonPaginationRequestDto {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  pageSize?: number;

  @IsOptional()
  search?: string;
}
