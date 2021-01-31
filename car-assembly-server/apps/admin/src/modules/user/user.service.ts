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

    findAll() {
        this.logger.log(`findAll: param -> xxx`);
        return this.userRepository.find();
    }

    async findOne(username: string): Promise<User | undefined> {
        this.logger.log(`findOne: username -> ${username}`);
        return await this.userRepository.findOne({ where: { username } });
    }
}
