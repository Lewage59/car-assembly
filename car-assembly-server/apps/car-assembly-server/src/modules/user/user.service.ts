import { LoggerService } from '@app/logger';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('UserService');
    }
    
    async getUserInfo(user_id: string): Promise<object | undefined> {
        const { password, ...result } = await this.userRepository.findOne({ where: { user_id } });
        return {
            userInfo: result
        };
    }
}
