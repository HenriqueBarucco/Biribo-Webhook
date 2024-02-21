import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { GitHubWebhook } from './dto/GitHubWebHook.dto';

@Controller('/v1/webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post()
    webhook(@Body() githubWebhook: GitHubWebhook): void {
        this.webhookService.process(githubWebhook);
    }
}
