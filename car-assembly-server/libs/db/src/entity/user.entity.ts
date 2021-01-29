/* eslint-disable */
const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

@Entity('user_info')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    tel: string;

    @Column()
    password: string;
    
    @Column()
    create_time: string;

    @Column()
    role: string;
}