import User from '../../infra/typeorm/entities/User';
import {uuid} from 'uuidv4';
import IUserrepositories from '../IUserrepositories';
import IcreateUserDto from '../../dto/IcreateUserDto';
import IfindAllProvidersDto from '../../dto/IfindAllProvidersDto';

class UserRepositoty implements IUserrepositories{

    private users: User[] = [];

        public async findAllProviders({except_user_id}:IfindAllProvidersDto):Promise <User[]>{
            let users = this.users;
            if(except_user_id){
                users = this.users.filter(user => user.id != except_user_id);
            }

            return users;

        }

        public async findById(id : string): Promise <User | undefined>{
            const user = await this.users.find(user => user.id === id);
            return user;
        }

       public async findByEmail(email : string): Promise <User | undefined>{

            const user = await this.users.find(user => (user.email === email));
            return user;

       }
       public async save(user:User):Promise<User>{
         const findIndex = this.users
         .findIndex(findUser => findUser.id === user.id);

         this.users[findIndex] = user;

         return user;

       }
        public async create(userdata:IcreateUserDto):Promise<User>{

            const user = new User();

            Object.assign(user,{id:uuid(),...userdata });

            this.users.push(user);
            return user;


        }
    }

export default UserRepositoty;
