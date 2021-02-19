import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Brand } from "./brand.entity";

@Entity('car_series')
export class Series {
    @PrimaryColumn({
        name: 'series_id'
    })
    id: number;
    
    @Column({
        name: 'brand_id'
    })
    brandId: string;

    @Column({
        name: 'series_name'
    })
    seriesName: string;

}