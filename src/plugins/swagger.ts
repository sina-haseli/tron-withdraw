import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFileSync, writeFileSync } from 'fs';
const { BASE_URL, APP_PORT } = process.env;

export const enableSwagger = (app) => {
  const { version } = JSON.parse(readFileSync('package.json', 'utf-8'));

  const options = new DocumentBuilder()
    .setTitle(`MAIN-PAGE-API`)
    .setDescription(`release date`)
    .setVersion(`v${version}`)
    .addBearerAuth()
    .addServer(BASE_URL, 'server')
    .addServer(`http://localhost:${APP_PORT}`, 'local')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  writeFileSync('./dist/swagger.json', JSON.stringify(document, null, 4));
  SwaggerModule.setup(`/docs`, app, document);
};
