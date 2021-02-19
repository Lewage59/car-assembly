import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('chassis')
export class Chassis {
    @PrimaryColumn({
        name: 'chassis_id'
    })
    id: number;

    @Column({
        name: 'model_id'
    })
    modelId: string;

    @Column({
        name: 'drive_method'
    })
    driveMethod: string;

    @Column({
        name: 'wheel_shape'
    })
    wheelShape: string;

    @Column({
        name: 'central_structure'
    })
    centralStructure: string;

    @Column({
        name: 'front_suspension_type'
    })
    frontSuspensionType: string;

    @Column({
        name: 'rear_suspension_type'
    })
    rearSuspensionType: string;

    @Column({
        name: 'assist_type'
    })
    assistType: string;

    @Column({
        name: 'body_structure'
    })
    bodyStructure: string;
}