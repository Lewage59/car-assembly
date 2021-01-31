import { LoggerService } from '@app/logger';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: LoggerService
    ) {}
    use(req: Request, res: Response, next: () => void) {
        const { method, path } = req;
        this.logger.log(`${method} ${path}`);
        next();
    }
}