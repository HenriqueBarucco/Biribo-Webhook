// eslint-disable-next-line @typescript-eslint/no-var-requires
const tracer = require('./tracer');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createAppLogger } from './logger/logger';

async function bootstrap() {
    await tracer.start();

    const app = await NestFactory.create(AppModule, {
        logger: createAppLogger(),
    });
    await app.listen(3000);
}

bootstrap();
