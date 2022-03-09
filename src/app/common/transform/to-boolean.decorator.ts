import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const ToBoolean = () => {
  return applyDecorators(
    Transform(({ value }) => {
      const trueValues = ['true', true, 1, '1'];
      return trueValues.includes(value);
    }),
  );
};
