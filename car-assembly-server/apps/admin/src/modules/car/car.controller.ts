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
}
