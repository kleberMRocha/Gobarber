import User from '../infra/typeorm/entities/User';
import IUserrepositories from '../repositories/IUserrepositories';
import AppError from '../../../shared/errors/AppError';
import {injectable,inject} from 'tsyringe';
import IHashProvider from '.././providers/hashprovider/models/IHashProvider';
import ICacheProvider from '../../../shared/container/Provider/CacheProvider/models/ICacheProvider';


interface IRequestDto{
    name:string;
    email:string;
    password:string;
}


@injectable()
class CreateUserService{
    constructor(
        @inject('userRepository')
        private userRepository: IUserrepositories,
        @inject('hashProvider')
        private HashProvider:IHashProvider,
        @inject('CacheProvider')
        private cacheProvider:ICacheProvider,
    ){}

    public  async execut({name,email,password}:IRequestDto):Promise<User> {

        const hash = await this.HashProvider.generateHash(password);

        const checkEmail = await this.userRepository.findByEmail(email);

        if(checkEmail){
            throw new AppError('User already exist');
        }

        const user = await this.userRepository.create({
            name,
            email,
            password:hash,
        });

        await this.cacheProvider.invalidadePrefix('Provider_list');

        return user;
}

}


export default CreateUserService;
