import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RepositoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column()
    phone: string;
}
