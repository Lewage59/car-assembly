import { 
    Controller, 
    Get, 
    HttpException, 
    HttpStatus, 
    Post, 
    Request, 
    UseGuards 
} from '@nestjs/common';
import { AuthService } from '@app/auth';
import { LocalAuthGuard } from '@app/auth/guard/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService
    ) {}

    @Get()
    getHello(): string {
        throw new HttpException(
            { status: HttpStatus.BAD_REQUEST, message: '请求参数id 必传', error: 'id is required' },
            HttpStatus.BAD_REQUEST,
        );
        return this.appService.getHello();
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
