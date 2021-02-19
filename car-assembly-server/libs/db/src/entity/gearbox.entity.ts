import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('gearbox')
export class Gearbox {
    @PrimaryColumn({
        name: 'gearbox_id'
    })
    id: number;

    @Column({
        name: 'model_id'
    })
    modelId: number;

    @Column({
        name: 'abbreviation'
    })
    abbreviation: string;
    
    @Column({
        name: 'gear_num'
    })
    gearNum: string;
    
    @Column({
        name: 'gearbox_type'
    })
    gearboxType: string;
}