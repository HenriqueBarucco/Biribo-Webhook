import { Module } from '@nestjs/common';
import { EasyWhatsAppModule } from './easy-whatsapp/easy-whatsapp.module';
import { WebhookModule } from './webhook/wekhook.module';
import { RepositoryModule } from './repository/repository.module';
import { PullRequestModule } from './pull-request/pull-request.module';
import { GitHubModule } from './github/github.module';

@Module({
    imports: [
        EasyWhatsAppModule,
        WebhookModule,
        RepositoryModule,
        PullRequestModule,
        GitHubModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
