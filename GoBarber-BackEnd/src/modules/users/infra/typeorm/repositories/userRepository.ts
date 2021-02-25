import User from '../entities/User';

import {getRepository, Not, Repository} from 'typeorm';
import IUserrepositories from '../../../repositories/IUserrepositories';
import IcreateUserDto from '../../../dto/IcreateUserDto';
import IfindAllProvidersDto from '../../../dto/IfindAllProvidersDto';


class UserRepositoty implements IUserrepositories{
    private ormRepository : Repository<User>;
    constructor(){
        this.ormRepository = getRepository(User);
    }

        public async findAllProviders({except_user_id}:IfindAllProvidersDto)
        :Promise<User[]>{

            let users: User[];

            except_user_id
            ? users = await this.ormRepository.find({where:{id:Not(except_user_id)}})
            : users = await this.ormRepository.find();

            return users;


        }

        public async findById(id : string): Promise <User | undefined>{
            const user = await this.ormRepository.findOne(id);
            return user;
        }

       public async findByEmail(email : string): Promise <User | undefined>{
        const user = await this.ormRepository.findOne({where:{email}});
        return user;

       }
       public async save(user:User):Promise<User>{
           return this.ormRepository.save(user);

       }
        public async create(userdata:IcreateUserDto):Promise<User>{
            const user = this.ormRepository.create(userdata);

            await this.ormRepository.save(user);

            return  user;
        }
    }

export default UserRepositoty;
