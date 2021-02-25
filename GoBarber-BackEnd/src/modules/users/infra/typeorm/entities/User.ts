import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import {Exclude,Expose} from 'class-transformer';

@Entity('users')
class users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    email: string;
    @Column()
    @Exclude()
    password: string;
    @Column()
    name: string;
    @Column()
    avatar: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @Expose({name:'avatar_url'})
    getAvatarUrl():string | null{
        return this.avatar ? `${process.env.APP_API_URL}/files/${this.avatar}`: null

    }

}

export default users;
