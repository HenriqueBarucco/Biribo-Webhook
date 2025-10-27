import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createAppLogger } from './logger/logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: createAppLogger(),
    });
    await app.listen(3000);
}

bootstrap();
