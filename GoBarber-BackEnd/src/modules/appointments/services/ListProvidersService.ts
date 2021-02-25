import User from '../../users/infra/typeorm/entities/User';
import IUserrepositories from '../../users/repositories/IUserrepositories'
import {inject,injectable} from 'tsyringe';
import ICacheProvider from '../../../shared/container/Provider/CacheProvider/models/ICacheProvider';

interface Request{
    user_id:string;
}

@injectable()
class ShowProviders{

    constructor(
        @inject('userRepository')
        private userRepository: IUserrepositories,

        @inject('CacheProvider')
        private cacheProvider:ICacheProvider,

    ){}

    public  async execut({user_id}:Request):Promise<User[]>{

        let users:any = await this.cacheProvider.recover<User[]>(`Provider_list:${user_id}`);

        if(!users){

            users = await this.userRepository.findAllProviders(
                {except_user_id:user_id}
            );

            console.log('foi feita a querry');

            await this.cacheProvider.save(`Provider_list:${user_id}`, users );

        }



       return users;

    }
}

export default ShowProviders;
