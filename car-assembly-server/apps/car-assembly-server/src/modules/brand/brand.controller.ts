import { Controller, Get, UseGuards, Request, Query, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
    constructor(
        private readonly brandService: BrandService
    ) {}

    // 获取品牌列表
    @Get('findBrand')
    async findBrand(@Query() query: any) {
        return await this.brandService.findAllBrand(query);
    }

    // 查询品牌系列信息
    @Get('findSeries')
    async findSeries(@Query() query: any) {
        return await this.brandService.findSeries(query);
    }
}
