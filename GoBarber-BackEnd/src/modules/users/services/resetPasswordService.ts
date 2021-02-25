import AppError from '../../../shared/errors/AppError';
import IUserrepositories from '../repositories/IUserrepositories';
import IUserToken from '../repositories/IUserToken';
import IHashProvider from '../providers/hashprovider/models/IHashProvider';
import { isAfter, addHours} from 'date-fns';
import {injectable,inject} from 'tsyringe';


interface IRequestDto{
    token:string;
    password: string;

}


@injectable()
class resetPasswordService{

    constructor(
        @inject('userRepository')
        private userRepository: IUserrepositories,

        @inject('userToken')
        private userToken: IUserToken,

        @inject('hashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execut({password,token}:IRequestDto):Promise<void> {

        const userToken = await this.userToken.findByToken(token);

        if(!userToken){
            throw new AppError('Token not Found');
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if(!user){
            throw new AppError('user not Found');
        }

        const tokenCreatedAt = userToken.created_at;

        const compareDate = addHours(tokenCreatedAt,2);

        if(isAfter(Date.now(),compareDate)){
            throw new AppError('Token expired!');
        }


        user.password = await this.hashProvider.generateHash(password);

        await this.userRepository.save(user);

    }

}


export default resetPasswordService;
