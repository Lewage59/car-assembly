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

    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    getProfile(@Request() req) {
        return req.user;
    }
}
