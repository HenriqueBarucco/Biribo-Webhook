import { Injectable, Inject } from '@nestjs/common';
import { RepositoryEntity } from './repository.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepositoryService {
    constructor(
        @Inject('REPOSITORY_REPOSITORY')
        private repository: Repository<RepositoryEntity>,
    ) {}

    async getByProject(project: string): Promise<RepositoryEntity | null> {
        return this.repository.findOne({
            where: { name: project },
        });
    }

    async create({ name, phone }: { name: string; phone: string }) {
        await this.repository.insert({ name, phone });
    }
}
