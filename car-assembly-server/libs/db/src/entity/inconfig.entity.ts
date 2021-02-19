import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('inconfig')
export class Inconfig {
    @PrimaryColumn({
        name: 'inconfig_id'
    })
    id: number;
    
    @Column({
        name: 'model_id'
    })
    modelId: number;
    
    @Column({
        name: 'abs'
    })
    abs: string;
    
    @Column({
        name: 'brake_force'
    })
    brakeForce: string;
    
    @Column({
        name: 'brake_assist'
    })
    brakeAssist: string;
    
    @Column({
        name: 'traction_ctl'
    })
    tractionCtl: string;
    
    @Column({
        name: 'stable_ctl'
    })
    stableCtl: string;
    
    @Column({
        name: 'uphill_assist'
    })
    uphillAssist: string;
    
    @Column({
        name: 'auto_parking'
    })
    autoParking: string;
    
    @Column({
        name: 'steep_slop'
    })
    steepSlop: string;
    
    @Column({
        name: 'variable_suspension'
    })
    variableSuspension: string;
    
    @Column({
        name: 'air_suspension'
    })
    airSuspension: string;
    
    @Column({
        name: 'variable_steer_ratio'
    })
    variableSteerRatio: string;
    
    @Column({
        name: 'electric_sunroof'
    })
    electricSunroof: string;
    
    @Column({
        name: 'panoramic_skylight'
    })
    panoramicSkylight: string;
  
    @Column({
        name: 'sport_appearance_kit'
    })
    sportAppearanceKit: string;
      
    @Column({
        name: 'external_audio_interface'
    })
    externalAudioInterface: string;
      
    @Column({
        name: 'media_system'
    })
    mediaSystem: string;
      
    @Column({
        name: 'speaker_brand'
    })
    speakerBrand: string;
      
    @Column({
        name: 'speaker_num'
    })
    speakerNum: string;
      
    @Column({
        name: 'low_beam'
    })
    lowBeam: string;
      
    @Column({
        name: 'high_beam'
    })
    highBeam: string;
      
    @Column({
        name: 'turn_headlight'
    })
    turnHeadlight: string;
}