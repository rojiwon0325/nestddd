import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
