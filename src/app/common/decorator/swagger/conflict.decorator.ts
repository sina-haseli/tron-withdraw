import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ConflictApiResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 409,
      description: 'One of unique fields of the record is duplicated',
    }),
  );
};
