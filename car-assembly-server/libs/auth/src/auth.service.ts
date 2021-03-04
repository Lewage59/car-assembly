import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne({ username: username});
        if (user && user.password === pass && user.status) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const { user_id, ...info } = user;
        const payload = { sub: user_id, ...info };
        
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
