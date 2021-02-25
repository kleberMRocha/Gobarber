export default interface IHashProvider{
    generateHash(playload:string):Promise<string>;
    compareHash(playload:string, hash:string):Promise<boolean>;
}
