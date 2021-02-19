import { LoggerService } from '@app/logger';
import { CarModel } from '@libs/db/entity/carModel.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(CarModel) private readonly carModelRepository: Repository<CarModel>,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('CarService');
    }

    async findAllCarModel(param: any): Promise<object> {
        param = Object.assign({
            currPage: 1,
            pageSize: 20
        }, param);

        const currCount = (param.currPage - 1) * param.pageSize;
        const total = await this.carModelRepository.count();
        const list = await this.carModelRepository
            .createQueryBuilder("car_model_info")
            .leftJoinAndSelect("car_model_info.series", "series")
            .leftJoinAndSelect("car_model_info.brand", "brand")
            // .leftJoinAndSelect("car_model_info.basicParam", "basicParam")
            // .leftJoinAndSelect("car_model_info.gearbox", "gearbox")
            // .leftJoinAndSelect("car_model_info.chassis", "chassis")
            // .leftJoinAndSelect("car_model_info.wheel", "wheel")
            // .leftJoinAndSelect("car_model_info.safety", "safety")
            // .leftJoinAndSelect("car_model_info.engine", "engine")
            // .leftJoinAndSelect("car_model_info.inconfig", "inconfig")
            .skip(currCount)
            .take(param.pageSize)
            .getMany();

        return {
            list,
            total
        };
    }
}
