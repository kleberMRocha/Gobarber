import {Entity,Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     ManyToOne,
     JoinColumn
    } from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';
@Entity('appointments')
class Appointment{
    @PrimaryGeneratedColumn('uuid')
    id:String;

    @Column('time with time zone')
    date:Date;

    @Column()
    user_id:String;

    @Column()
    provider_id:String;

    @ManyToOne(() => User,{eager:true})
    @JoinColumn({name:'user_id'})
    user:User;

    @ManyToOne(() => User)
    @JoinColumn({name:'provider_id'})
    provider:User;

    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

}

export default Appointment;
