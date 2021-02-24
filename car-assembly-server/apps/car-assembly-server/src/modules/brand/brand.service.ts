import { LoggerService } from '@app/logger';
import { Brand } from '@libs/db/entity/brand.entity';
import { Series } from '@libs/db/entity/series.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
        @InjectRepository(Series) private readonly seriesRepository: Repository<Series>,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('brandService');
    }

    async findAllBrand(param: any): Promise<object> {
        param = Object.assign({
            currPage: 1,
            pageSize: 20
        }, param);

        const currCount = (param.currPage - 1) * param.pageSize;
        const total = await this.brandRepository.count();
        const list = await this.brandRepository
            .createQueryBuilder("brand")
            .skip(currCount)
            .take(param.pageSize)
            .getMany();

        return {
            list,
            total
        };
    }
    
    async findSeries(param: any): Promise<object> {
        let list, total;
        param = Object.assign({
            currPage: 1,
            pageSize: 20
        }, param);

        const currCount = (param.currPage - 1) * param.pageSize;
        const brandId = { 
            brandId: param.brandId || 0
        };
        
        try {

            if (param.brandId) {
                total = await this.seriesRepository.count(brandId);
                list = await this.seriesRepository
                    .createQueryBuilder("car_series")
                    .where("car_series.brand_id = :brandId", brandId)
                    .skip(currCount)
                    .take(param.pageSize)
                    .getMany();
            } else {
                total = await this.seriesRepository.count();
                list = await this.seriesRepository
                    .createQueryBuilder("car_series")
                    .skip(currCount)
                    .take(param.pageSize)
                    .getMany();
            }

        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {
            list,
            total
        };
    }
}
