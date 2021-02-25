import UserToken from '../../users/infra/typeorm/entities/userToken';

export default interface IUserToken {
generate(id:string):Promise<UserToken>;
findByToken(token:string):Promise<UserToken | undefined>

}
