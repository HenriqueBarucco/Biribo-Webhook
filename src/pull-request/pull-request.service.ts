import { Injectable } from '@nestjs/common';
import { EasyWhatsAppService } from 'src/easy-whatsapp/easy-whatsapp.service';

@Injectable()
export class PullRequestService {
    constructor(private readonly easyWhatsAppService: EasyWhatsAppService) {}

    async opened(project: string, prNumber: number, user: string) {
        await this.easyWhatsAppService.sendMessage(
            process.env.PHONE_NUMBER,
            `🤖 PR #${prNumber} - Aberto:\nProjeto: ${project}\nAberto por: ${user}`,
        );
    }

    async reviewed(project: string, prNumber: number, user: string) {
        await this.easyWhatsAppService.sendMessage(
            process.env.PHONE_NUMBER,
            `✏️ PR #${prNumber} - Pedido de alteração:\nProjeto: ${project}\nPor: ${user}`,
        );
    }

    async resolved(project: string, prNumber: number, user: string) {
        await this.easyWhatsAppService.sendMessage(
            process.env.PHONE_NUMBER,
            `😊 PR #${prNumber} - Alterações aceitas:\nProjeto: ${project}\nPor: ${user}`,
        );
    }

    async closed(project: string, prNumber: number, user: string) {
        await this.easyWhatsAppService.sendMessage(
            process.env.PHONE_NUMBER,
            `✅ PR #${prNumber} - Aceito:\nProjeto: ${project}\nPor: ${user}`,
        );
    }
}
