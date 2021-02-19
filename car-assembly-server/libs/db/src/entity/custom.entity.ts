import { Entity, PrimaryColumn } from "typeorm";

@Entity('custom')
export class Custom {
    @PrimaryColumn({
        name: 'custom_id'
    })
    id: number;
}