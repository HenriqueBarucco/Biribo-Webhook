// eslint-disable-next-line @typescript-eslint/no-var-requires
import otelSDK from './tracing';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createAppLogger } from './logger/logger';

async function bootstrap() {
    await otelSDK.start();

    const app = await NestFactory.create(AppModule, {
        logger: createAppLogger(),
    });
    await app.listen(3000);
}

bootstrap();
