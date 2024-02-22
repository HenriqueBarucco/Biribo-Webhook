import { Injectable } from '@nestjs/common';
import { PullRequestService } from 'src/pull-request/pull-request.service';
import { PullRequestOpened } from './dto/pull-request-opened.dto';
import { PullRequestClosed } from './dto/pull-request-closed.dto';
import { PullRequestReviewed } from './dto/pull-request-reviewed.dto';
import { PullRequestResolved } from './dto/pull-request-resolved.dto';

@Injectable()
export class GitHubService {
    constructor(private readonly pullRequestService: PullRequestService) {}

    async pullRequestOpened(payload: PullRequestOpened) {
        await this.pullRequestService.opened(
            payload.repository.name,
            payload.pull_request.number,
            payload.pull_request.user.login,
        );
    }

    async pullRequestReviewed(payload: PullRequestReviewed) {
        await this.pullRequestService.reviewed(
            payload.repository.name,
            payload.pull_request.number,
            payload.comment.user.login,
        );
    }

    async pullRequestResolved(payload: PullRequestResolved) {
        await this.pullRequestService.resolved(
            payload.repository.name,
            payload.pull_request.number,
            payload.sender.login,
        );
    }

    async pullRequestClosed(payload: PullRequestClosed) {
        await this.pullRequestService.closed(
            payload.repository.name,
            payload.pull_request.number,
            payload.pull_request.user.login,
        );
    }
}
