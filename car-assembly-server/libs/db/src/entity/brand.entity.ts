import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('brand')
export class Brand {
    @PrimaryGeneratedColumn({
        name: 'brand_id'
    })
    id: number;

    @Column({
        name: 'pre_letter'
    })
    preLetter: string;

    @Column({
        name: 'brand_name'
    })
    brandName: string;

    @Column({
        name: 'logo_path'
    })
    logoPath: string;
}