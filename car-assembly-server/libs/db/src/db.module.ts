import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './entity/user.entity';
import { Brand } from './entity/brand.entity';
import { Series } from './entity/series.entity';
import { BasicParam } from './entity/basicParam.entity';
import { CarModel } from './entity/carModel.entity';
import { Chassis } from './entity/chassis.entity';
import { Custom } from './entity/custom.entity';
import { Engine } from './entity/engine.entity';
import { Gearbox } from './entity/gearbox.entity';
import { Inconfig } from './entity/inconfig.entity';
import { Safety } from './entity/safety.entity';
import { Wheel } from './entity/wheel.entity';

const entities = TypeOrmModule.forFeature([
    User,
    Brand,
    Series,
    BasicParam,
    CarModel,
    Chassis,
    Custom,
    Engine,
    Gearbox,
    Inconfig,
    Safety,
    Wheel
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
            entities: [
                User,
                Brand,
                Series,
                BasicParam,
                CarModel,
                Chassis,
                Custom,
                Engine,
                Gearbox,
                Inconfig,
                Safety,
                Wheel
            ],
            charset: "utf8mb4" // 设置chatset编码为utf8mb4
        }),
        entities
    ],
    providers: [DbService],
    exports: [DbService, entities],
})
export class DbModule {
    constructor(private readonly connection: Connection) {}
}
