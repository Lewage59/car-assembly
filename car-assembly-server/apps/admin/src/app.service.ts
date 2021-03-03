import { LoggerService } from '@app/logger';
import { Brand } from '@libs/db/entity/brand.entity';
import { CarModel } from '@libs/db/entity/carModel.entity';
import { Custom } from '@libs/db/entity/custom.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(CarModel) private readonly carModelRepository: Repository<CarModel>,
        @InjectRepository(Custom) private readonly customRepository: Repository<Custom>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('CarService');
    }

    async findPanelNum(): Promise<object> {
        const carNum = await this.carModelRepository.count();
        const customNum = await this.customRepository.count();
        const userNum = await this.userRepository.count();
        const brandNum = await this.brandRepository.count();
        return {
            carNum,
            customNum,
            userNum,
            brandNum
        };
    }
}
