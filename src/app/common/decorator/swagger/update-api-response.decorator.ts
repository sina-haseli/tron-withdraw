import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import CommonUpdateResponseDto from '../../dto/common-update.response.dto';

export const UpdateApiResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'update a single record',
      type: CommonUpdateResponseDto,
    }),
  );
};
