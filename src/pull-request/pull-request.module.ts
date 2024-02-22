import { Module } from '@nestjs/common';
import { EasyWhatsAppModule } from 'src/easy-whatsapp/easy-whatsapp.module';
import { PullRequestService } from './pull-request.service';

@Module({
    imports: [EasyWhatsAppModule],
    providers: [PullRequestService],
    exports: [PullRequestService],
})
export class PullRequestModule {}
