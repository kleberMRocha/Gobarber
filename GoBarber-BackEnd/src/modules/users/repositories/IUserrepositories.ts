import User from '../infra/typeorm/entities/User';
import IcreateUserDto from '../dto/IcreateUserDto';
import IfindAllProvidersDto from '../dto/IfindAllProvidersDto';


export default interface IUserRepository{
    findAllProviders(data:IfindAllProvidersDto):Promise<User[]>
    findById(id:string): Promise<User | undefined>;
    findByEmail(id:string): Promise<User | undefined>;
    create(data:IcreateUserDto): Promise<User>;
    save(user:User): Promise<User>;
}
