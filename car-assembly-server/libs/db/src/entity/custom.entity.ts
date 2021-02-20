import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('car_custom')
export class Custom {
    @PrimaryColumn({
        name: 'custom_id'
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

    @Column({
        name: 'series_id'
    })
    seriesId: number;

    @Column({
        name: 'brand_id'
    })
    brandId: number;

    @Column({
        name: 'basic_param_id'
    })
    basicParamId: number;

    @Column({
        name: 'gearbox_id'
    })
    gearboxId: number;

    @Column({
        name: 'chassis_id'
    })
    chassisId: number;

    @Column({
        name: 'wheel_id'
    })
    wheelId: number;

    @Column({
        name: 'safety_id'
    })
    safetyId: number;

    @Column({
        name: 'engine_id'
    })
    engineId: number;
    
    @Column({
        name: 'inconfig_id'
    })
    inconfigId: number;
}