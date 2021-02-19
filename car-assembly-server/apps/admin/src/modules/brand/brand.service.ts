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

    async updateBrand(param: any): Promise<string> {
        const { brandId, ...data } = param;

        try {
            await this.brandRepository.update(brandId, data);
        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return '更新成功';
    }

    async createBrand(brand: any): Promise<string> {

        try {
            const newBrand = await this.brandRepository.save(brand);
        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return '创建成功';
    }

    async deleteBrand(query: any): Promise<string> {

        try {
            const removeBrand = await this.brandRepository.delete(query.id);
        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return '删除成功'; 
    }

    async findSeries(param: any): Promise<object> {
        let list, total;
        try {
            [list, total] = await this.seriesRepository.findAndCount({ brandId: param.brandId});
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
