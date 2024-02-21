import { Injectable } from '@nestjs/common';
import { GitHubWebhook } from './dto/GitHubWebHook.dto';
import { EasyWhatsAppService } from 'src/easy-whatsapp/easy-whatsapp.service';

@Injectable()
export class WebhookService {
    constructor(private readonly easyWhatsAppService: EasyWhatsAppService) {}
    process(dto: GitHubWebhook): void {
        console.log(`Processing webhook: ${dto.payload.action}`);
        if (dto.payload.action === 'opened') {
            this.pullRequestOpened(
                dto.payload.repository.name,
                dto.payload.pull_request.number,
                dto.payload.pull_request.user.login,
            );
        }
        if (dto.payload.action === 'created') {
            this.pullRequestReview(
                dto.payload.repository.name,
                dto.payload.pull_request.number,
                dto.payload.sender.login,
            );
        }
        if (dto.payload.action === 'resolved') {
            this.pullRequestResolved(
                dto.payload.repository.name,
                dto.payload.pull_request.number,
                dto.payload.sender.login,
            );
        }
        if (dto.payload.action === 'closed') {
            this.pullRequestClosed(
                dto.payload.repository.name,
                dto.payload.pull_request.number,
                dto.payload.sender.login,
            );
        }
    }

    private async pullRequestOpened(
        project: string,
        prNumber: number,
        user: string,
    ) {
        await this.easyWhatsAppService.sendMessage(
            process.env.PHONE_NUMBER,
            `🤖 PR #${prNumber} - Aberto:\nProjeto: ${project}\nAberto por: ${user}`,
        );
    }

    private async pullRequestReview(
        project: string,
        prNumber: number,
        user: string,
    ) {
        await this.easyWhatsAppService.sendMessage(
            process.env.PHONE_NUMBER,
            `✏️ PR #${prNumber} - Pedido de alteração:\nProjeto: ${project}\nPor: ${user}`,
        );
    }

    private async pullRequestResolved(
        project: string,
        prNumber: number,
        user: string,
    ) {
        await this.easyWhatsAppService.sendMessage(
            process.env.PHONE_NUMBER,
            `😊 PR #${prNumber} - Alterações aceitas:\nProjeto: ${project}\nPor: ${user}`,
        );
    }

    private async pullRequestClosed(
        project: string,
        prNumber: number,
        user: string,
    ) {
        await this.easyWhatsAppService.sendMessage(
            process.env.PHONE_NUMBER,
            `✅ PR #${prNumber} - Aceito:\nProjeto: ${project}\nPor: ${user}`,
        );
    }
}
