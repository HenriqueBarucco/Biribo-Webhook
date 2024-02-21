import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
    process(): void {
        console.log('Processing webhook');
    }
}
