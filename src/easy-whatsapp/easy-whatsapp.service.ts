import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EasyWhatsApp } from 'easy-whatsapp-lib';

@Injectable()
export class EasyWhatsAppService implements OnModuleInit {
    private connection: EasyWhatsApp;
    private readonly logger = new Logger(EasyWhatsAppService.name);

    constructor() {}

    onModuleInit() {
        this.connection = new EasyWhatsApp(process.env.EASY_WHATSAPP_KEY);
    }

    async sendMessage(phone: string, message: string) {
        if (phone && message) {
            this.logger.log(`Sending message to ${phone}: ${message}`);
            this.connection.sendMessage(phone, message);
        }
    }
}
