import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { GitHubModule } from 'src/github/github.module';

@Module({
    imports: [GitHubModule],
    controllers: [WebhookController],
    providers: [WebhookService],
})
export class WebhookModule {}
