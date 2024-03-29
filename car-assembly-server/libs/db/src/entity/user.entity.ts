import { 
    Entity, 
    Column, 
    Generated, 
    PrimaryGeneratedColumn
} from "typeorm";

/* eslint-disable */

@Entity('user_info')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    user_id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column()
    tel: string;

    @Column()
    password: string;
    
    @Column()
    create_time: string;

    @Column()
    update_time: string;

    @Column()
    role: number;

    @Column()
    status: number;

    @Column()
    birthday: string;
    
    @Column()
    sex: number;
}