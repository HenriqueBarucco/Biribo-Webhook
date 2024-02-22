import { Module } from '@nestjs/common';
import { PullRequestModule } from 'src/pull-request/pull-request.module';
import { GitHubService } from './github.service';

@Module({
    imports: [PullRequestModule],
    providers: [GitHubService],
    exports: [GitHubService],
})
export class GitHubModule {}
