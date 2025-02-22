import IHashProvider from '../models/IHashProvider';
import {compare,hash} from 'bcrypt';

export default class BCryptHashProvider implements IHashProvider {
    public async generateHash(payload:string):Promise<string>{
        return hash(payload,8);
    }

    public async compareHash(payload:string, hash:string):Promise<boolean>{
        return compare(payload, hash);
    }

}

