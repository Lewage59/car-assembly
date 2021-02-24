import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
    controllers: [BrandController],
    providers: [BrandService],
    exports: [BrandService]
})
export class BrandModule {}
