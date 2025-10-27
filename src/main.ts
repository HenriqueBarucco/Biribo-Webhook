// eslint-disable-next-line @typescript-eslint/no-var-requires
import sdk from './tracer';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createAppLogger } from './logger/logger';

async function bootstrap() {
    await sdk.start();

    const app = await NestFactory.create(AppModule, {
        logger: createAppLogger(),
    });
    await app.listen(3000);
}

bootstrap();
