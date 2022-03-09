import { applyDecorators } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export const IsId = () => {
  return applyDecorators(IsNotEmpty(), IsNumber(), Min(1), IsInt());
};
