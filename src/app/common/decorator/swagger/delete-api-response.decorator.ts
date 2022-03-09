import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import CommonDeleteResponseDto from '../../dto/common-delete.response.dto';

export const DeleteApiResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'remove a single record',
      type: CommonDeleteResponseDto,
    }),
  );
};
