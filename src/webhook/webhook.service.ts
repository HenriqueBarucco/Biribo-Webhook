import { Injectable } from '@nestjs/common';
import { Webhook } from './dto/webhook.dto';
import { GitHubService } from 'src/github/github.service';

@Injectable()
export class WebhookService {
    constructor(private readonly githubService: GitHubService) {}
    async process(webhook: Webhook) {
        switch (webhook.event) {
            case 'pull_request':
                if (webhook.payload.action == 'opened') {
                    this.githubService.pullRequestOpened(webhook.payload);
                }
                if (webhook.payload.action == 'closed') {
                    this.githubService.pullRequestClosed(webhook.payload);
                }
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
