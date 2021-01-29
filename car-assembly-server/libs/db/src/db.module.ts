import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './entity/user.entity';

const entities = TypeOrmModule.forFeature([
    User
]);

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '82580',
            database: 'car_assembly',
            entities: [User],
            synchronize: true
        }),
        entities
    ],
    providers: [DbService],
    exports: [DbService, entities],
})
export class DbModule {
    constructor(private readonly connection: Connection) {}
}
