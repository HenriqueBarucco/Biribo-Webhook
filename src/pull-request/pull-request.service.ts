import { Injectable } from '@nestjs/common';
import { EasyWhatsAppService } from 'src/easy-whatsapp/easy-whatsapp.service';
import { RepositoryService } from 'src/repository/repository.service';

@Injectable()
export class PullRequestService {
    constructor(
        private readonly easyWhatsAppService: EasyWhatsAppService,
        private readonly repositoryService: RepositoryService,
    ) {}

    private async getSender(project: string): Promise<string> {
        const repository = await this.repositoryService.getByProject(project);

        if (repository === null) {
            console.log(`Repository ${project} not found.`);
            return;
        }

        return repository?.phone;
    }

    async opened(project: string, prNumber: number, user: string) {
        await this.easyWhatsAppService.sendMessage(
            await this.getSender(project),
            `🤖 PR #${prNumber} - Aberto:\nProjeto: ${project}\nAberto por: ${user}`,
        );
    }

    async reviewed(project: string, prNumber: number, user: string) {
        await this.easyWhatsAppService.sendMessage(
            await this.getSender(project),
            `✏️ PR #${prNumber} - Pedido de alteração:\nProjeto: ${project}\nPor: ${user}`,
        );
    }

    async resolved(project: string, prNumber: number, user: string) {
        await this.easyWhatsAppService.sendMessage(
            await this.getSender(project),
            `😊 PR #${prNumber} - Alterações aceitas:\nProjeto: ${project}\nPor: ${user}`,
        );
    }

    async closed(project: string, prNumber: number, user: string) {
        await this.easyWhatsAppService.sendMessage(
            await this.getSender(project),
            `✅ PR #${prNumber} - Aceito:\nProjeto: ${project}\nPor: ${user}`,
        );
    }
}
