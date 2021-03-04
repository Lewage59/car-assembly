import { AuthService } from '@app/auth';
import { LocalAuthGuard } from '@app/auth/guard/local-auth.guard';
import { Controller, Get, Post, UseGuards, Request, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
import multer = require('multer');

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly appService: AppService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('auth/sendEmail')
    async sendEmail(@Body() body: any) {
      return this.appService.sendEmail(body);
    }

    // 文件上传
    @Post('uploadFile')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        return file;
    }
}
