export default interface IStorangeProvider{
    saveFile(file:string):Promise<string>;
    deleteFile(file:string):Promise<void>;
}
