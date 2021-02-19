import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('safety')
export class Safety {
    @PrimaryColumn({
        name: 'safety_id'
    })
    id: number;

    @Column({
        name: 'model_id'
    })
    modelId: number;

    @Column({
        name: 'driver_seat_airbag'
    })
    driverSeatAirbag: string;

    @Column({
        name: 'side_airbag'
    })
    sideAirbag: string;
    
    @Column({
        name: 'head_airbag'
    })
    headAirbag: string;
    
    @Column({
        name: 'lap_airbag'
    })
    lapAirbag: string;
    
    @Column({
        name: 'tire_monitor'
    })
    tireMonitor: string;
    
    @Column({
        name: 'zero_tire_driving'
    })
    zeroTireDriving: string;
    
    @Column({
        name: 'seat_belt_reminder'
    })
    seatBeltReminder: string;
    
    @Column({
        name: 'child_seat_interface'
    })
    childSeatInterface: string;
    
    @Column({
        name: 'engine_anti_theft'
    })
    engineAntiTheft: string;
    
    @Column({
        name: 'central_lock'
    })
    centralLock: string;
    
    @Column({
        name: 'remote_key'
    })
    remoteKey: string;
        
    @Column({
        name: 'keyless_start'
    })
    keylessStart: string;
    
    @Column({
        name: 'keyless_entry'
    })
    keylessEntry: string;
}