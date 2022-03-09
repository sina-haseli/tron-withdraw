import { applyDecorators } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export const IsArrayId = () => {
  return applyDecorators(IsNotEmpty(), IsInt({ each: true }), IsNumber({}, { each: true }), Min(1, { each: true }));
};
