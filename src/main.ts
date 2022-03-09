import './plugins/dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enableSwagger } from './plugins/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };
  app.enableCors(options);
  enableSwagger(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(1337);
}
bootstrap();
