import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: 'smtps://920576696@qq.com:thjecmgjdgjjbeae@smtp.qq.com',
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>',
                },
                // template: {
                //     dir: path.join(__dirname, './templates'),
                //     adapter: new PugAdapter(),
                //     options: {
                //         strict: true
                //     }
                // }
            })
        })
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
