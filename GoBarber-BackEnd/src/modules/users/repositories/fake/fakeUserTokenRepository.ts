import UserToken from '../../infra/typeorm/entities/userToken';
import {uuid} from 'uuidv4';
import IUserToken from '../IUserToken';



class FakeUserTokenRepository implements IUserToken{
        private userToken:UserToken[] = [];

        public async generate(user_id : string): Promise<UserToken>{
           const token = new UserToken;

           Object.assign(token,
            {
                id:uuid(),
                token:uuid(),
                user_id,
                created_at: new Date(),
                updated_at: new Date(),


            })

            this.userToken.push(token);

           return token;
        }

        public async findByToken(token:string): Promise<UserToken | undefined>{

            const userToken = await this.userToken.find(findtoke => findtoke.token === token);

           return userToken;

        }


    }

export default FakeUserTokenRepository;
