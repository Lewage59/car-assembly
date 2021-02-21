import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    // 获取用户个人信息
    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    async getUserInfo(@Request() req) {
        return await this.userService.getUserInfo(req.user.user_id);
    }
}
