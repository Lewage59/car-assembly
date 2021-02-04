import { LoggerService } from '@app/logger';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: LoggerService
    ) {}
    use(req: Request, res: Response, next: () => void) {
        const { method, baseUrl, body, query } = req;
        let params;

        if (method === 'POST') {
            params = JSON.stringify(body);
        } else {
            params = JSON.stringify(query);
        }

        this.logger.log(`${method} ${baseUrl} => ${params}`);
        next();
    }
}