import { DataSource } from 'typeorm';
import { RepositoryEntity } from './repository.entity';

export const repositoryProviders = [
    {
        provide: 'REPOSITORY_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(RepositoryEntity),
        inject: ['DATA_SOURCE'],
    },
];
