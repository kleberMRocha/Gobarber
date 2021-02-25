import IStorageProvider from '../models/IStorageProvider';


class FakeStorangeProvider implements IStorageProvider{
    private storage:string[] = [];

    public async saveFile(file:string):Promise<string>{

        this.storage.push(file);

        return file;

    }

    public async deleteFile(file:string):Promise<void>{

        const findIndex = await this.storage.findIndex(file => file === file);

        this.storage.splice(findIndex,1);

    }
}


export default FakeStorangeProvider;
