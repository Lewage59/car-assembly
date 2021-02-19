import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('wheel')
export class Wheel {
    @PrimaryColumn({
        name: 'wheel_id'
    })
    id: number;
    
    @Column({
        name: 'model_id'
    })
    modelId: number;

    @Column({
        name: 'front_brake_type'
    })
    frontBrakeType: string;
    
    @Column({
        name: 'rear_brake_type'
    })
    rearBrakeType: string;
    
    @Column({
        name: 'park_brake_type'
    })
    parkBrakeType: string;
    
    @Column({
        name: 'front_tires_standard'
    })
    frontTiresStandard: string;
    
    @Column({
        name: 'rear_tires_standard'
    })
    rearTiresStandard: string;
    
    @Column({
        name: 'spare_tires_standard'
    })
    spareTiresStandard: string;
}