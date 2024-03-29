import { Injectable } from '@nestjs/common';
import { GitHubService } from 'src/github/github.service';

@Injectable()
export class WebhookService {
    constructor(private readonly githubService: GitHubService) {}
    async process(webhook: any) {
        switch (webhook?.action) {
            case 'opened':
                this.githubService.pullRequestOpened(webhook);
                break;
            case 'closed':
                this.githubService.pullRequestClosed(webhook);
                break;
            case 'created':
                this.githubService.pullRequestReviewed(webhook);
                break;
            case 'resolved':
                this.githubService.pullRequestResolved(webhook);
                break;
            default:
                console.log(`Event not supported: ${webhook?.action}`);
        }
    }
}
