import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { repositoryProviders } from './repository.providers';
import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';

@Module({
    imports: [DatabaseModule],
    providers: [...repositoryProviders, RepositoryService],
    controllers: [RepositoryController],
    exports: [RepositoryService],
})
export class RepositoryModule {}
