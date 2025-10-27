import { Injectable, Logger } from '@nestjs/common';
import { GitHubService } from 'src/github/github.service';

@Injectable()
export class WebhookService {
    constructor(private readonly githubService: GitHubService) {}
    private readonly logger = new Logger(WebhookService.name);
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
                this.logger.warn(`Event not supported: ${webhook?.action}`);
        }
    }
}
