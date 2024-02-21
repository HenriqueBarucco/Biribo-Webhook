import { Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('/v1/webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post()
    webhook(): void {
        this.webhookService.process();
    }
}
