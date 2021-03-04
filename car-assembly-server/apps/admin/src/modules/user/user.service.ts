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

    async getUserInfo(user_id: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { user_id } });
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
        user.create_time = +new Date();
        try {
            const newUser = await this.userRepository.save(user);
        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return '创建成功';
    }

    async findAllUser(param: any): Promise<object> {
        let result;
        let sql = 'SELECT * FROM user_info WHERE 1=1';
        if (param.username) {
            sql += ` AND username LIKE '%${param.username}%'`;
        }
        if (param.role) {
            sql += ` AND role = ${param.role}`;
        }
        if (param.status) {
            sql += ` AND status = ${param.status}`;
        }

        try {
            result = await this.userRepository.query(sql);
        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

    async deleteUser(query) {
        try {
            const removeUser = await this.userRepository.delete({ user_id: query.id });
        } catch (error) {
            this.logger.warn(error);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return '删除成功'; 
    }

    async findSexNum(): Promise<object> {
        let result;
        try {
            result = await this.userRepository.query('SELECT sex, COUNT(*) as nums from user_info GROUP BY sex');
        } catch (err) {
            this.logger.warn(err);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }
}
