import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { EasyWhatsAppModule } from 'src/easy-whatsapp/easy-whatsapp.module';

@Module({
    imports: [EasyWhatsAppModule],
    controllers: [WebhookController],
    providers: [WebhookService],
})
export class WebhookModule {}
