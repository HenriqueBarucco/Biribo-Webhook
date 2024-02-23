import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryEntity } from './repository.entity';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

interface CreateRepository {
    name: string;
    phone: string;
}

@UseGuards(JwtAuthGuard)
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

    @Get()
    async findAll(): Promise<RepositoryEntity[]> {
        return await this.repositoryService.findAll();
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.repositoryService.delete(id);
    }
}
