import { Module } from '@nestjs/common';
import { EasyWhatsAppModule } from 'src/easy-whatsapp/easy-whatsapp.module';
import { PullRequestService } from './pull-request.service';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
    imports: [EasyWhatsAppModule, RepositoryModule],
    providers: [PullRequestService],
    exports: [PullRequestService],
})
export class PullRequestModule {}
