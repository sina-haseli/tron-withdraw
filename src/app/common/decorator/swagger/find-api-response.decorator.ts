import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const FindApiResponse = (Entity: Type<any>) => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'find a list of records',
      type: [Entity],
    }),
  );
};
