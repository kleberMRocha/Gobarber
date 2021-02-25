import UserToken from '../entities/userToken';

import {getRepository, Repository} from 'typeorm';

import IUserToken from '../../../repositories/IUserToken';


class UserTokenRepository implements IUserToken{
    private ormRepository : Repository<UserToken>;
    constructor(){
        this.ormRepository = getRepository(UserToken);
    }

        public async findByToken(token : string): Promise <UserToken | undefined>{
            const userToken = await this.ormRepository.findOne({where:{token}});
            return userToken;
        }
        public async generate(user_id : string): Promise <UserToken>{

            const userToken = this.ormRepository.create({user_id});
            await this.ormRepository.save(userToken);

            return userToken;
        }

    }

export default UserTokenRepository;
