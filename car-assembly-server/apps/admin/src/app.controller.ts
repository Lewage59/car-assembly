import { 
    Controller, 
    Get, 
    HttpException, 
    HttpStatus, 
    Post, 
    Query, 
    Request, 
    UploadedFile, 
    UseGuards, 
    UseInterceptors
} from '@nestjs/common';
import { AuthService } from '@app/auth';
import { LocalAuthGuard } from '@app/auth/guard/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    
    // 查询后台数据统计
    @UseGuards(AuthGuard('jwt'))
    @Get('findPanelNum')
    async findPanelNum() {
        return await this.appService.findPanelNum();
    }

    // 文件上传
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        console.log(file);
        return true;
    }
}
