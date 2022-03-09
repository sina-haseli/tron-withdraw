import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const NotFoundApiResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 404,
      description: 'cannot find a record',
    }),
  );
};
