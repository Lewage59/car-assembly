import { Body, Controller, Request, Get, Post, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';

@Controller('admin/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    // 获取用户个人信息
    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    async getUserInfo(@Request() req) {
        const { password, ...result } = await this.userService.getUserInfo(req.user.user_id);
        return result;
    }

    // 更新用户信息
    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    async update (@Body() body: any) {
        return await this.userService.update(body);
    }

    // 获取所有用户列表
    @UseGuards(AuthGuard('jwt'))
    @Get('userList')
    async findAllUser (@Query() query: any) {
        const userList = await this.userService.findAllUser(query);
        return {
            userList
        };
    }

    // 创建用户
    @UseGuards(AuthGuard('jwt'))
    @Post('createUser')
    async createUser(@Body() body: any) {
        return await this.userService.createUser(body);
    }

    // 删除用户
    @UseGuards(AuthGuard('jwt'))
    @Get('deleteUser')
    async deleteUser(@Query() query: any) {
        return await this.userService.deleteUser(query);
    }

    // 头像上传
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        console.log(file);
        return true;
    }

    // 获取用户性别数据信息
    @Get('findSexNum')
    async findSexNum() {
        return await this.userService.findSexNum();
    }
    
}
