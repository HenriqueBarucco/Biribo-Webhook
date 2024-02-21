import { Module } from '@nestjs/common';
import { EasyWhatsAppService } from './easy-whatsapp.service';

@Module({
    imports: [],
    providers: [EasyWhatsAppService],
    exports: [EasyWhatsAppService],
})
export class EasyWhatsAppModule {}
