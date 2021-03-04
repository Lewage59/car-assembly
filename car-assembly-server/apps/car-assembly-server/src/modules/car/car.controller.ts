import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
    constructor(
        private readonly carService: CarService
    ) {}

    // 获取官方汽车列表
    @Get('findAllCarModel')
    async findAllCarModel(@Query() query: any) {
        const result = await this.carService.findAllCarModel(query);
        return result;
    }

    // 获取官方汽车列表
    @Get('findAllCarSeries')
    async findAllCarSeries(@Query() query: any) {
        const result = await this.carService.findAllCarSeries(query);
        return result;
    }

    // 查询汽车模型基本参数
    @Get('findCarParam')
    async findCarParam(@Query() query: any) {
        const result = await this.carService.findCarParam(query);
        return result;
    }

    // 查询所有配件信息
    @Get('findAllCarParam')
    async findAllCarParam(@Query() query: any) {
        const result = await this.carService.findAllCarParam(query);
        return result;
    }

    // 获取用户组装汽车列表
    @UseGuards(AuthGuard('jwt'))
    @Get('findAllCustom')
    async findAllCustom(@Query() query: any) {
        const result = await this.carService.findAllCustom(query);
        return result;
    }

    // 保存用户组装汽车信息
    @UseGuards(AuthGuard('jwt'))
    @Post('saveCustomInfo')
    async saveCustomInfo(@Body() body: object) {
        const result = await this.carService.saveCustomInfo(body);
        return result;
    }

    // 删除用户组装汽车信息
    @UseGuards(AuthGuard('jwt'))
    @Post('deleteCustomInfo')
    async deleteCustomInfo(@Body() body: object) {
        return await this.carService.deleteCustomInfo(body);
    }

    // 查询最新发布车辆
    @Get('findNewCarList')
    async findNewCarList() {
        return await this.carService.findNewCarList();
    }

}
