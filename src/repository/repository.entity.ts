import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repositories')
export class RepositoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500, unique: true })
    name: string;

    @Column()
    phone: string;
}
