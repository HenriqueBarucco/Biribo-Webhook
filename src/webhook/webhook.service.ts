import { Injectable } from '@nestjs/common';
import { GitHubService } from 'src/github/github.service';

@Injectable()
export class WebhookService {
    constructor(private readonly githubService: GitHubService) {}
    async process(webhook: any) {
        switch (webhook.action) {
            case 'opened':
                this.githubService.pullRequestOpened(webhook);
                break;
            case 'closed':
                this.githubService.pullRequestClosed(webhook);
                break;
            case 'pull_request_review_comment':
                if (webhook.payload.action == 'created') {
                    this.githubService.pullRequestReviewed(webhook.payload);
                }
                break;
            case 'pull_request_review_thread':
                if (webhook.payload.action == 'resolved') {
                    this.githubService.pullRequestResolved(webhook.payload);
                }
                break;
            default:
                console.log(`Event not supported: ${webhook.event}`);
        }
    }
}
