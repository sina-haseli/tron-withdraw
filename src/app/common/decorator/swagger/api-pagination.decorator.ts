import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPagination = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      description: '',
      content: {
        'application-json': {
          schema: {
            properties: {
              items: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(model),
                },
              },
              pagination: {
                type: 'object',
                properties: {
                  count: { type: 'number' },
                  pageSize: { type: 'number' },
                  page: { type: 'number' },
                },
              },
            },
          },
        },
      },
    }),
  );
};
