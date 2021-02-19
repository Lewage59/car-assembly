import { Controller, Get, UseGuards, Request, Query, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BrandService } from './brand.service';

@Controller('admin/brand')
export class BrandController {
    constructor(
        private readonly brandService: BrandService
    ) {}

    // 获取品牌列表
    @UseGuards(AuthGuard('jwt'))
    @Get('findBrand')
    async findBrand(@Query() query: any) {
        return await this.brandService.findAllBrand(query);
    }

    // 删除品牌信息
    @UseGuards(AuthGuard('jwt'))
    @Get('deleteBrand')
    async deleteBrand(@Query() query: any) {
        return await this.brandService.deleteBrand(query);;
    }

    // 更新品牌信息
    @UseGuards(AuthGuard('jwt'))
    @Post('updateBrand')
    async updateBrand(@Body() body: any) {
        return await this.brandService.updateBrand(body);;
    }

    // 新增品牌
    @UseGuards(AuthGuard('jwt'))
    @Post('createBrand')
    async createBrand(@Body() body: any) {
        return await this.brandService.createBrand(body);;
    }

    // 查询品牌系列信息
    @UseGuards(AuthGuard('jwt'))
    @Get('findSeries')
    async findSeries(@Query() query: any) {
        return await this.brandService.findSeries(query);
    }
}
