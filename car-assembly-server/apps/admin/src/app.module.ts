import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';
import { BrandModule } from './modules/brand/brand.module';
import { LoggerModule } from '@app/logger';
import { AuthModule } from '@app/auth';
import { StatusMonitorModule } from 'nest-status-monitor';
import statusMonitorConfig from './config/status-monitor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

@Module({
    imports: [
        CommonModule,
        MulterModule.register({
            dest: '/uploads'
        }),
        DbModule,
        AuthModule,
        LoggerModule,
        UserModule,
        CarModule,
        StatusMonitorModule.setUp(statusMonitorConfig),
        BrandModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}
