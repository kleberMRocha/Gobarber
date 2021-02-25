import AppError from '../../../shared/errors/AppError';
import IUserrepositories from '../repositories/IUserrepositories';
import IUserToken from '../repositories/IUserToken';
import {injectable,inject} from 'tsyringe';
import ImailProvider from '../../../shared/container/Provider/mailProvider/models/ImailProvider';
import users from '../infra/typeorm/entities/User';
import path from 'path'

interface IRequestDto{
    email:string;
}


@injectable()
class sendForgotPasswordEmailService{

    constructor(
        @inject('userRepository')
        private userRepository: IUserrepositories,
        @inject('EtherealmailProvider')
        private mailProvider: ImailProvider,
        @inject('userToken')
        private userToken: IUserToken
    ){}

    public async execut({email}:IRequestDto):Promise<void> {
        const checkUserExists = await this.userRepository.findByEmail(email);

        if(!checkUserExists){
            throw new AppError('E-mail não cadastrado!');
        }

       const {token} = await this.userToken.generate(checkUserExists.id);

       const forgotPasswordFile = path.resolve(__dirname,'..','views','forgot_password.hbs');

       console.log(token);
        await this.mailProvider.sendMail({
            to:{
                name:checkUserExists.name,
                email:checkUserExists.email,
            },
            subject:'[goBarber]Recuperação de Senha',
            templete:{
                file:forgotPasswordFile,
                variables:{
                    name:checkUserExists.name,
                    link:`localhost:3000/reset?token=${token}`
                }
            }
        });

    }

}


export default sendForgotPasswordEmailService;
