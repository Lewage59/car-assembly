// import { CacheService } from '@app/cache';
import { Injectable } from '@nestjs/common';
import { EmailService } from 'libs/email';

@Injectable()
export class AppService {
    constructor(
        private readonly emailService: EmailService,
        // private readonly cacheService: CacheService
    ) {}

    async sendEmail(body: any): Promise<string> {
        return await this.emailService.sendEmail(body);
    }
}
