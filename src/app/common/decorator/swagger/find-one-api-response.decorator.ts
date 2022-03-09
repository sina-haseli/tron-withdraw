import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const FindOneApiResponse = (Entity: Type<any>) => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'find a single record',
      type: Entity,
    }),
  );
};
