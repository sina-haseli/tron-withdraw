import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ServiceUnavailableApiResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 503,
      description: 'service is not available',
    }),
  );
};
