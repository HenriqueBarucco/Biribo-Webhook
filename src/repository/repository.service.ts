import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

    async findAll(): Promise<RepositoryEntity[]> {
        return await this.repository.find();
    }

    async delete(id: number) {
        const repository = await this.repository.findOne({ where: { id } });
        if (!repository) {
            throw new NotFoundException('Repository not found');
        }
        await this.repository.remove(repository);
    }
}
