import { Controller, Get, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

    @Get()
    async check() {
        try {
            // simple lightweight query to verify DB connectivity
            await this.dataSource.query('SELECT 1');
            return { status: 'ok', db: 'up' };
        } catch (err) {
            throw new HttpException({ status: 'error', db: 'down' }, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
