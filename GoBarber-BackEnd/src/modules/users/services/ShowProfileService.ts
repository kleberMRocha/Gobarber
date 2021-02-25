import User from '../infra/typeorm/entities/User';
import IUserrepositories from '../repositories/IUserrepositories'
import AppError from '../../../shared/errors/AppError';
import {inject,injectable} from 'tsyringe';

interface Request{
    user_id:string;
}

@injectable()
class ShowProfileSerivce{

    constructor(
        @inject('userRepository')
        private userRepository: IUserrepositories,
    ){}

    public  async execut({user_id}:Request):Promise<User>{

        const user = await this.userRepository.findById(user_id);

        if(!user){
            throw new AppError('User not Found');
        }

       return user;

    }
}

export default ShowProfileSerivce;
