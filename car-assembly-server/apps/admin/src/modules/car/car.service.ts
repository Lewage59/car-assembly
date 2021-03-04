import { LoggerService } from '@app/logger';
import { BasicParam } from '@libs/db/entity/basicParam.entity';
import { CarModel } from '@libs/db/entity/carModel.entity';
import { Chassis } from '@libs/db/entity/chassis.entity';
import { Custom } from '@libs/db/entity/custom.entity';
import { Engine } from '@libs/db/entity/engine.entity';
import { Gearbox } from '@libs/db/entity/gearbox.entity';
import { Inconfig } from '@libs/db/entity/inconfig.entity';
import { Safety } from '@libs/db/entity/safety.entity';
import { Wheel } from '@libs/db/entity/wheel.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(CarModel) private readonly carModelRepository: Repository<CarModel>,
        @InjectRepository(BasicParam) private readonly basicParamRepository: Repository<BasicParam>,
        @InjectRepository(Chassis) private readonly chassisRepository: Repository<Chassis>,
        @InjectRepository(Engine) private readonly engineRepository: Repository<Engine>,
        @InjectRepository(Gearbox) private readonly gearboxRepository: Repository<Gearbox>,
        @InjectRepository(Inconfig) private readonly inconfigRepository: Repository<Inconfig>,
        @InjectRepository(Safety) private readonly safetyRepository: Repository<Safety>,
        @InjectRepository(Wheel) private readonly wheelRepository: Repository<Wheel>,
        @InjectRepository(Custom) private readonly customRepository: Repository<Custom>,
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
            .leftJoinAndSelect("car_model_info.basicParam", "basicParam")
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

    async findCarParam(param: any): Promise<object> {
        const { modelId, paramType, isCustom } = param;
        let paramResult;

        try {
            const query = isCustom ? { id: modelId } : { modelId: modelId };
            switch (paramType) {
                case 'basicParam':
                    paramResult = await this.basicParamRepository.findOne(query);
                    break;
                case 'chassis':
                    paramResult = await this.chassisRepository.findOne(query);
                    break;
                case 'engine':
                    paramResult = await this.engineRepository.findOne(query);
                    break;
                case 'gearbox':
                    paramResult = await this.gearboxRepository.findOne(query);
                    break;
                case 'inconfig':
                    paramResult = await this.inconfigRepository.findOne(query);
                    break;
                case 'safety':
                    paramResult = await this.safetyRepository.findOne(query);
                    break;
                case 'wheel':
                    paramResult = await this.wheelRepository.findOne(query);
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.logger.error(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {
            paramResult
        };
    }

    async findAllCustom(param: any): Promise<object> {
        param = Object.assign({
            currPage: 1,
            pageSize: 20
        }, param);
        
        const currCount = (param.currPage - 1) * param.pageSize;
        const total = await this.customRepository.count();
        let customList;

        try {
            customList = await this.customRepository
                .createQueryBuilder('car_custom')
                .innerJoinAndSelect("car_custom.basicParam", "basicParam")
                .skip(currCount)
                .take(param.pageSize)
                .getMany();
        } catch (error) {
            this.logger.error(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {
            customList,
            total
        };
    }
    
    async findLevelNum(): Promise<object>{
        const result = await this.basicParamRepository.query('SELECT level, count(*) AS nums FROM basic_param group by level');
        return result;
    }

    async findVendorRank(): Promise<object> {
        const result = await this.basicParamRepository.query('SELECT vendor, count(*) AS nums FROM basic_param group by vendor ORDER BY nums DESC LIMIT 12');
        return result;
    }
}
