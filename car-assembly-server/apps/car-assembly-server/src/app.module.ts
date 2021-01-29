import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        DbModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
