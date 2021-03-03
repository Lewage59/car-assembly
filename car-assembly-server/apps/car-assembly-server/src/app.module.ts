import { DbModule } from '@libs/db';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusMonitorModule } from 'nest-status-monitor';
import statusMonitorConfig from './config/status-monitor';
import { AuthModule } from '@app/auth';
import { LoggerModule } from '@app/logger';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BrandModule } from './modules/brand/brand.module';
import { EmailModule } from 'libs/email';
import { CommonModule } from '@app/common';

@Module({
    imports: [
        CommonModule,
        DbModule,
        AuthModule,
        LoggerModule,
        StatusMonitorModule.setUp(statusMonitorConfig),
        UserModule,
        CarModule,
        BrandModule,
        EmailModule
    ],
    controllers: [AppController, UserController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}
