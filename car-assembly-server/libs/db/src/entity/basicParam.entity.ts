import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('basic_param')
export class BasicParam {
    @PrimaryColumn({
        name: 'basic_param_id'
    })
    id: number;

    @Column({
        name: 'model_id'
    })
    modelId: number;

    @Column({
        name: 'guide_price'
    })
    guidePrice: string;

    @Column({
        name: 'vendor'
    })
    vendor: string;

    @Column({
        name: 'level'
    })
    level: string;

    @Column({
        name: 'engine'
    })
    engine: string;

    @Column({
        name: 'gearbox'
    })
    gearbox: string;

    @Column({
        name: 'lwh'
    })
    lwh: string;

    @Column({
        name: 'body_structure'
    })
    bodyStructure: string;

    @Column({
        name: 'max_speed'
    })
    maxSpeed: string;

    @Column({
        name: 'official_speed'
    })
    officialSpeed: string;

    @Column({
        name: 'measure_speed'
    })
    measureSpeed: string;

    @Column({
        name: 'measure_brake'
    })
    measureBrake: string;

    @Column({
        name: 'measure_fuel_consumption'
    })
    measureFuelConsumption: string;

    @Column({
        name: 'gxb_fuel_consumption'
    })
    gxbFuelConsumption: string;
    
    @Column({
        name: 'measure_ground_clearance'
    })
    measureGroundClearance: string;
    
    @Column({
        name: 'vehicle_warranty'
    })
    vehicleWarranty: string;
}