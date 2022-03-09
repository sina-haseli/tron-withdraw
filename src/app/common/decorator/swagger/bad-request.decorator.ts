import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const BadRequestApiResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'something is wrong with request',
    }),
  );
};
