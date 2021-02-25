import {Request,Response} from 'express';
import {container} from 'tsyringe';
import CreateUserService from '../../../services/createUser';

export default class UsersController{
   public async create(request:Request,response:Response): Promise<Response | undefined>{

    const {name,password,email} = request.body;
    const createUserService = container.resolve(CreateUserService);
    try {
        const user = await createUserService.execut({name,password,email});
        delete user.password;
        response.status(200).send(user);
    }
    catch (error) {

        return response
        .status(400)
        .json({error:error.message});

    }


    }

}
