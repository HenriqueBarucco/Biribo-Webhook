import { Body, Controller, Post } from '@nestjs/common';
import { RepositoryService } from './repository.service';

interface CreateRepository {
    name: string;
    phone: string;
}

@Controller('/v1/repository')
export class RepositoryController {
    constructor(private readonly repositoryService: RepositoryService) {}

    @Post()
    create(@Body() createRepository: CreateRepository): void {
        this.repositoryService.create({
            name: createRepository.name,
            phone: createRepository.phone,
        });
    }
}
