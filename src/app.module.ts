import { Module } from '@nestjs/common';
import { EasyWhatsAppModule } from './easy-whatsapp/easy-whatsapp.module';
import { WebhookModule } from './webhook/wekhook.module';

@Module({
    imports: [EasyWhatsAppModule, WebhookModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
