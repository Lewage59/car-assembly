import { LoggerService } from '@app/logger';
import { User } from '@libs/db/entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    
    async update(updateParam: any): Promise<string> {
        const { user_id, ...update } = updateParam;
        update.update_time = +new Date();
        try {
            await this.userRepository.update({ user_id }, update);
        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return '更新成功';
    }

    async createUser (user: any): Promise<string> {
        const checkUsername = await this.userRepository.find({ username: user.username });

        if (checkUsername.length > 0) {
            throw new HttpException({
                code: 4001,
                message: '用户名重复'
            }, HttpStatus.BAD_REQUEST);
        }

        user.create_time = +new Date();
        try {
            const newUser = await this.userRepository.save(user);
        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return '创建成功';
    }
}
