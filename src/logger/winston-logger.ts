import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { LogstashTransport } from 'winston-logstash-transport';

class WinstonLogger implements LoggerService {
    private logger: winston.Logger;

    constructor() {
        const env = process.env.ENV || 'development';
        const logstashHost = process.env.LOGSTASH_HOST;
        const logstashPort = process.env.LOGSTASH_PORT
            ? parseInt(process.env.LOGSTASH_PORT, 10)
            : undefined;

        const consoleFormat = winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
                const metaStr = Object.keys(meta).length
                    ? JSON.stringify(meta)
                    : '';
                return `${timestamp} [${env}] ${level}: ${message} ${metaStr}`;
            }),
        );

        const transports: winston.transport[] = [
            new winston.transports.Console({ format: consoleFormat }),
        ];

        if (logstashHost && logstashPort) {
            try {
                transports.push(
                    new LogstashTransport({
                        host: logstashHost,
                        port: logstashPort,
                    }) as any,
                );
            } catch (err) {
                console.error(
                    'Failed to initialize Logstash transport for Winston logger:',
                    err,
                );
            }
        }

        this.logger = winston.createLogger({
            level:
                process.env.LOG_LEVEL ||
                (env === 'production' ? 'info' : 'debug'),
            transports,
            exitOnError: false,
        });
    }

    log(message: any, context?: string): void {
        this.logger.info(this.format(message, context));
    }

    error(message: any, trace?: string, context?: string): void {
        this.logger.error(this.format(message, context), { trace });
    }

    warn(message: any, context?: string): void {
        this.logger.warn(this.format(message, context));
    }

    debug(message: any, context?: string): void {
        this.logger.debug(this.format(message, context));
    }

    verbose(message: any, context?: string): void {
        this.logger.verbose(this.format(message, context));
    }

    private format(message: any, context?: string) {
        const ctx = context ? `[${context}] ` : '';
        if (typeof message === 'string') return `${ctx}${message}`;
        try {
            return `${ctx}${JSON.stringify(message)}`;
        } catch {
            return `${ctx}${String(message)}`;
        }
    }
}

const logger = new WinstonLogger();
export default logger;
