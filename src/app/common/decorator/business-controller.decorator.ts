import { applyDecorators, ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidateDto } from './validate-dto.decorator';

export const BusinessController = (route, name) => {
  return applyDecorators(
    ApiBearerAuth(),
    UseInterceptors(ClassSerializerInterceptor),
    ApiTags(name),
    ValidateDto(),
    Controller(route),
  );
};
