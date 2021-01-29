import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UserModule } from './user/user.module';
import { LoggerModule } from '@app/logger';

@Module({
    imports: [
        DbModule,
        LoggerModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
