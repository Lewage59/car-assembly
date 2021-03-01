import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    sendEmail() {
      this.mailerService.sendMail({
        to: 'lee82580@icloud.com',
        from: '920576696@qq.com',
        subject: 'Testing Nest MailerModule ✔',
        html: '<b>Welcome Email!</b>'
        // template: 'welcome'
      });
    }
}
