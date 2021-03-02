import { AuthService } from '@app/auth';
import { LocalAuthGuard } from '@app/auth/guard/local-auth.guard';
import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { EmailService } from 'libs/email';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly emailService: EmailService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('auth/sendEmail')
    async sendEmail(@Body() body: any) {
      return await this.emailService.sendEmail(body);
    }
}
