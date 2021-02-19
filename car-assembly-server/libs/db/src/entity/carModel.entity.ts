import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { BasicParam } from "./basicParam.entity";
import { Brand } from "./brand.entity";
import { Chassis } from "./chassis.entity";
import { Engine } from "./engine.entity";
import { Gearbox } from "./gearbox.entity";
import { Inconfig } from "./inconfig.entity";
import { Safety } from "./safety.entity";
import { Series } from "./series.entity";
import { Wheel } from "./wheel.entity";

@Entity('car_model_info')
export class CarModel {
    @PrimaryColumn({
        name: 'model_id'
    })
    id: number;

    @Column({
        name: 'model_name'
    })
    modelName: string;

    @Column({
        name: 'sales_status'
    })
    salesStatus: string;

    @Column({
        name: 'period'
    })
    period: string;

    @Column({
        name: 'exterior_color'
    })
    exteriorColor: string;

    @Column({
        name: 'interior_color'
    })
    interiorColor: string;

    @OneToOne(() => Series)
    @JoinColumn({ name: "series_id" })
    series: Series;

    @OneToOne(() => Brand)
    @JoinColumn({ name: "brand_id" })
    brand: Brand;

    @OneToOne(() => BasicParam)
    @JoinColumn({ name: "basic_param_id" })
    basicParam: BasicParam;

    @OneToOne(() => Gearbox)
    @JoinColumn({ name: "gearbox_id" })
    gearbox: Gearbox;

    @OneToOne(() => Chassis)
    @JoinColumn({ name: "chassis_id" })
    chassis: Chassis;

    @OneToOne(() => Wheel)
    @JoinColumn({ name: "wheel_id" })
    wheel: Wheel;

    @OneToOne(() => Safety)
    @JoinColumn({ name: "safety_id" })
    safety: Safety;

    @OneToOne(() => Engine)
    @JoinColumn({ name: "engine_id" })
    engine: Engine;
    
    @OneToOne(() => Inconfig)
    @JoinColumn({ name: "inconfig_id" })
    inconfig: Inconfig;
}