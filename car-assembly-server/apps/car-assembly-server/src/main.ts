import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { 
        logger: ['error', 'warn', 'log'] 
    });
    
    // 全局过滤器
    app.useGlobalFilters(new HttpExceptionFilter());

    // 全局注册拦截器
    app.useGlobalInterceptors(new TransformInterceptor());
    
    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
