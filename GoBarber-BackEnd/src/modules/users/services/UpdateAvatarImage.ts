import User from '../infra/typeorm/entities/User';
import IUserrepositories from '../repositories/IUserrepositories';
import AppError from '../../../shared/errors/AppError';
import {inject,injectable} from 'tsyringe';
import IStorageProvider from '../../../shared/container/Provider/storageProvider/models/IStorageProvider'


interface Request{
    userId:string;
    file:Express.Multer.File;

}
@injectable()
class UpdateAvatarImage{

    constructor(
        @inject('userRepository')
        private userRepository: IUserrepositories,

        @inject('storageProvider')
        private storageProvider: IStorageProvider,
    ){}

    public  async execut({userId, file}:Request):Promise<User>{
        if(!userId) throw new AppError('por favor, informe um id valido!');

            const user = await this.userRepository.findById(userId);
            if(!user){
                throw new AppError('User não encontrado');
            }

            if(user.avatar){
                await this.storageProvider.deleteFile(user.avatar);
            }

            try {
                const fileName = await this.storageProvider.saveFile(file.originalname);
    
            } catch (error) {
                console.log(error);
            }

            user.avatar = file.originalname ;
            
            await this.userRepository.save(user);

            return user;
        

    }
}

export default UpdateAvatarImage;
