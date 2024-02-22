import { Injectable, OnModuleInit } from '@nestjs/common';
import { EasyWhatsApp } from 'easy-whatsapp-lib';

@Injectable()
export class EasyWhatsAppService implements OnModuleInit {
    private connection: EasyWhatsApp;

    constructor() {}

    onModuleInit() {
        this.connection = new EasyWhatsApp(process.env.EASY_WHATSAPP_KEY);
    }

    async sendMessage(phone: string, message: string) {
        if (phone && message) {
            console.log(`Sending message to ${phone}: ${message}`);
            this.connection.sendMessage(phone, message);
        }
    }
}
