import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    // 获取随机数
    randomNum(n: number): string{
        const num = [];
        for (let i = 0; i < n; i++) {
            num[i] = Math.floor(Math.random() * 10);
        }
        return num.join('');
    }

    async sendEmail(param: any): Promise<string> {
        const code = this.randomNum(6);

        this.mailerService.sendMail({
            to: param.email,
            from: '920576696@qq.com',
            subject: '汽车组装演示平台',
            html: `<p>您好！</p>
                <p>若确认是您的邮箱，可使用以下验证码。</p>
                <p>验证码：<strong style="color: #409EFF;">${code}</strong></p>
                <p>***该验证码5分钟内有效***</p>`
            // template: 'welcome'
        });
      
        return 'ok';
    }
}
