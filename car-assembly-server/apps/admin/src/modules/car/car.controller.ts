import { Controller, Get, UseGuards, Request, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CarService } from './car.service';

@Controller('admin/car')
export class CarController {
    constructor(
        private readonly carService: CarService
    ) {}

    // 获取汽车品牌列表
    @UseGuards(AuthGuard('jwt'))
    @Get('findAllCarModel')
    async findAllCarModel(@Query() query: any) {
        const result = await this.carService.findAllCarModel(query);
        return result;
    }

    // 查询汽车模型基本参数
    @UseGuards(AuthGuard('jwt'))
    @Get('findCarParam')
    async findCarParam(@Query() query: any) {
        const result = await this.carService.findCarParam(query);
        return result;
    }

    // 获取用户组装汽车列表
    @UseGuards(AuthGuard('jwt'))
    @Get('findAllCustom')
    async findAllCustom(@Query() query: any) {
        const result = await this.carService.findAllCustom(query);
        return result;
    }
}
