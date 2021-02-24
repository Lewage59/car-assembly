import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
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

    // 更新用户信息
    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    async update (@Body() body: any) {
        return await this.userService.update(body);
    }

    // 创建用户
    @Post('createUser')
    async createUser(@Body() body: any) {
        return await this.userService.createUser(body);
    }
    
}
