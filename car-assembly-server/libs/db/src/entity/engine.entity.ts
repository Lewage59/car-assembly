import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('engine')
export class Engine {
    @PrimaryColumn({
        name: 'engine_id'
    })
    id: number;

    @Column({
        name: 'model_id'
    })
    modelId: number;
    
    @Column({
        name: 'engine_type'
    })
    engineType: string;
    
    @Column({
        name: 'displacement_ml'
    })
    displacementMl: string;
    
    @Column({
        name: 'displacement_l'
    })
    displacementL: string;
    
    @Column({
        name: 'intake_form'
    })
    intakeForm: string;
    
    @Column({
        name: 'cylinder_arrangement'
    })
    cylinderArrangement: string;
    
    @Column({
        name: 'cylinder_num'
    })
    cylinderNum: string;
    
    @Column({
        name: 'cylinder_valve_num'
    })
    cylinderValveNum: string;
    
    @Column({
        name: 'compression_ratio'
    })
    compressionRatio: string;
    
    @Column({
        name: 'gas_structure'
    })
    gasStructure: string;
    
    @Column({
        name: 'bore'
    })
    bore: string;
    
    @Column({
        name: 'stroke'
    })
    stroke: string;
    
    @Column({
        name: 'max_horsepower'
    })
    maxHorsepower: string;

    @Column({
        name: 'max_power'
    })
    maxPower: string;
    
    @Column({
        name: 'max_power_speed'
    })
    maxPowerSpeed: string;
    
    @Column({
        name: 'max_torque'
    })
    maxTorque: string;
    
    @Column({
        name: 'max_torque_speed'
    })
    maxTorqueSpeed: string;
    
    @Column({
        name: 'specific_technology'
    })
    specificTechnology: string;
    
    @Column({
        name: 'fuel_form'
    })
    fuelForm: string;
    
    @Column({
        name: 'fuel_label'
    })
    fuelLabel: string;
    
    @Column({
        name: 'fuel_supply'
    })
    fuelSupply: string;
    
    @Column({
        name: 'cylinder_head_material'
    })
    cylinderHeadMaterial: string;
    
    @Column({
        name: 'cylinder_body_material'
    })
    cylinderBodyMaterial: string;
    
    @Column({
        name: 'env_standard'
    })
    envStandard: string;
}