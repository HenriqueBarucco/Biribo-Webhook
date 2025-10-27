import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger from './logger/winston-logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });
    app.useLogger(logger as any);
    await app.listen(3000);
}

bootstrap();
