import {Entity,Column,Generated, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('user_token')
class UserToken{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    @Generated('uuid')
    token:string;

    @Column()
    user_id:string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default UserToken;
