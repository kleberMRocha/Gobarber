import User from '../infra/typeorm/entities/User';
import IHashProvider from '.././providers/hashprovider/models/IHashProvider';
import jsonwebtoken from 'jsonwebtoken';
import AppError from '../../../shared/errors/AppError';
import IUserrepositories from '../repositories/IUserrepositories';
import {injectable,inject} from 'tsyringe';

interface IRequestDto{
    email:string;
    password:string;
}

interface ITokem{
    user:User;
    token:string;
}

@injectable()
class CreateSession{

    constructor(
        @inject('userRepository')
        private userRepository: IUserrepositories,
        @inject('hashProvider')
        private HashProvider : IHashProvider,
    ){}

    public async execut({email,password}:IRequestDto):Promise<ITokem> {
       const user = await this.userRepository.findByEmail(email);

       if(!user){
           throw new AppError('incorrect email / password combination',401);
       }

       const passwordMatched = await this.HashProvider.compareHash(password,user.password);
        if(!passwordMatched){
                throw new AppError('incorrect email / password combination',401);
        }

       var token = jsonwebtoken.sign({email}, 'passWord',{
           subject:user.id,
           expiresIn:'1d'

       });

       return {user,token}

    }

}


export default CreateSession;
