import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BasicParam } from '@libs/db/entity/basicParam.entity';
import { CarModel } from '@libs/db/entity/carModel.entity';
import { Chassis } from '@libs/db/entity/chassis.entity';
import { Custom } from '@libs/db/entity/custom.entity';
import { Engine } from '@libs/db/entity/engine.entity';
import { Gearbox } from '@libs/db/entity/gearbox.entity';
import { Inconfig } from '@libs/db/entity/inconfig.entity';
import { Safety } from '@libs/db/entity/safety.entity';
import { Wheel } from '@libs/db/entity/wheel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@app/logger';
import { Series } from '@libs/db/entity/series.entity';

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
        @InjectRepository(Series) private readonly seriesRepository: Repository<Series>,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('CarService');
    }

    async findAllCarModel(param: any): Promise<object> {
        let total, listQuery, totalQuery;
        param = Object.assign({
            currPage: 1,
            pageSize: 20
        }, param);
        
        const currCount = (param.currPage - 1) * param.pageSize;
        const brandId = { 
            brandId: param.brandId || 0
        };

        try {
            totalQuery = this.carModelRepository;
            listQuery = this.carModelRepository
                .createQueryBuilder("car_model_info")
                .innerJoinAndSelect("car_model_info.series", "series")
                .innerJoinAndSelect("car_model_info.brand", "brand")
                .innerJoinAndSelect("car_model_info.basicParam", "basicParam");
                // .innerJoinAndSelect("car_model_info.gearbox", "gearbox")
                // .innerJoinAndSelect("car_model_info.chassis", "chassis")
                // .innerJoinAndSelect("car_model_info.wheel", "wheel")
                // .innerJoinAndSelect("car_model_info.safety", "safety")
                // .innerJoinAndSelect("car_model_info.engine", "engine")
                // .innerJoinAndSelect("car_model_info.inconfig", "inconfig")
            
            if (param.brandId) {
                total = await totalQuery.query(`SELECT COUNT(DISTINCT series_id) AS total FROM car_model_info WHERE brand_id = ${param.brandId}`);
                listQuery = listQuery
                    .where("car_model_info.brand_id = :brandId", brandId)
                    .groupBy("car_model_info.series_id");
            } else {
                total = await totalQuery.query(`SELECT COUNT(DISTINCT series_id) as total FROM car_model_info`);
                listQuery = listQuery
                    .groupBy("car_model_info.series_id");
            }

        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        const list = await listQuery
            .skip(currCount)
            .take(param.pageSize)
            .getMany();

        total = JSON.stringify(total);
        total = JSON.parse(total)[0].total;

        return {
            list,
            total
        };
    }

    async findCarParam(param: any): Promise<object> {
        const { modelId, paramType } = param;
        let paramResult;

        try {
            switch (paramType) {
                case 'basicParam':
                    paramResult = await this.basicParamRepository.findOne({ modelId: modelId });
                    break;
                case 'chassis':
                    paramResult = await this.chassisRepository.findOne({ modelId: modelId });
                    break;
                case 'engine':
                    paramResult = await this.engineRepository.findOne({ modelId: modelId });
                    break;
                case 'gearbox':
                    paramResult = await this.gearboxRepository.findOne({ modelId: modelId });
                    break;
                case 'inconfig':
                    paramResult = await this.inconfigRepository.findOne({ modelId: modelId });
                    break;
                case 'safety':
                    paramResult = await this.safetyRepository.findOne({ modelId: modelId });
                    break;
                case 'wheel':
                    paramResult = await this.wheelRepository.findOne({ modelId: modelId });
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

    async findAllCarParam(param: any): Promise<object> {
        let paramResultQuery, paramResult;

        param = Object.assign({
            currPage: 1,
            pageSize: 20
        }, param);
        
        const currCount = (param.currPage - 1) * param.pageSize;
        const { paramType } = param;

        try {
            switch (paramType) {
                case 'basicParam':
                    paramResultQuery = this.basicParamRepository.createQueryBuilder("basicParam");
                    break;
                case 'chassis':
                    paramResultQuery = this.chassisRepository.createQueryBuilder("chassis");
                    break;
                case 'engine':
                    paramResultQuery = this.engineRepository.createQueryBuilder("engine");
                    break;
                case 'gearbox':
                    paramResultQuery = this.gearboxRepository.createQueryBuilder("gearbox");
                    break;
                case 'inconfig':
                    paramResultQuery = this.inconfigRepository.createQueryBuilder("inconfig");
                    break;
                case 'safety':
                    paramResultQuery = this.safetyRepository.createQueryBuilder("safety");
                    break;
                case 'wheel':
                    paramResultQuery = this.wheelRepository.createQueryBuilder("wheel");
                    break;
                default:
                    break;
            }
            paramResult = await paramResultQuery
                .skip(currCount)
                .take(param.pageSize)
                .getMany();
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
        let customList, total;

        try {
            total = await this.customRepository.count({ userId: param.userId });
            customList = await this.customRepository
                .createQueryBuilder('car_custom')
                .innerJoinAndSelect("car_custom.basicParam", "basicParam")
                .where("car_custom.user_id = :userId", { userId: param.userId })
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

    // 保存用户组装汽车信息
    async saveCustomInfo(custom: any): Promise<string> {
        try {
            await this.customRepository.save(custom);
        } catch (error) {
            this.logger.error(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return '保存成功';
    }

    // 删除用户组装汽车信息
    async deleteCustomInfo(body: any): Promise<string> {
        try {
            await this.customRepository.delete(body.customId);
        } catch (error) {
            this.logger.error(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return '删除成功';
    }
}
