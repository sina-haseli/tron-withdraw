import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const InternalServerErrorApiResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 500,
      description: 'something wrong happened in server',
    }),
  );
};
