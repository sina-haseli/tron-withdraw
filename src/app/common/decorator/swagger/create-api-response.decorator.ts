import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const CreateApiResponse = (Entity: Type<any>) => {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'create a single record',
      type: Entity,
    }),
  );
};
