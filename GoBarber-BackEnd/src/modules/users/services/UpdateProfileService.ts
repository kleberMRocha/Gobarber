import User from '../infra/typeorm/entities/User';
import IUserrepositories from '../repositories/IUserrepositories'
import AppError from '../../../shared/errors/AppError';
import {inject,injectable} from 'tsyringe';

import IHashProvider from '.././providers/hashprovider/models/IHashProvider';


interface Request{
    user_id:string;
    name:string;
    email:string;
    old_password?:string;
    password?:string;
}

@injectable()
class UpdateProfile{

    constructor(
        @inject('userRepository')
        private userRepository: IUserrepositories,

        @inject('hashProvider')
        private IHashProvider: IHashProvider,
    ){}

    public  async execut({user_id,name,email, password, old_password}:Request):Promise<User>{

        const user = await this.userRepository.findById(user_id);

        const EmailCheck = await this.userRepository.findByEmail(email);

        if(EmailCheck && EmailCheck.id !== user_id){
            throw new AppError('Email Aready in use!');
        }

        if(!user){
            throw new AppError('User not Found');
        }


        if(password && !old_password){
            throw new AppError('Please enter your old password');
        }

        if (password && old_password) {
            console.log(user.password, old_password);

            const checkOldPassword = await this.IHashProvider.compareHash(
              old_password,
              user.password,
            );

            if (!checkOldPassword) {
              throw new AppError('Old password does not match.');
            }

            user.password = await this.IHashProvider.generateHash(password);
          }


        user.name = name;
        user.email = email;

       return this.userRepository.save(user);

    }
}

export default UpdateProfile;
