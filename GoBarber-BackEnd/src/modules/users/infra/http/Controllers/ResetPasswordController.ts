import {Request,Response} from 'express';
import {container} from 'tsyringe';
import resetPasswordService from '../../../services/resetPasswordService';

export default class ResetPasswordController{
   public async create(request:Request,response:Response): Promise<Response | undefined>{

    const {password, token} = request.body;

    const resetPassword= container.resolve(resetPasswordService);
    try {

        await resetPassword.execut({password, token});

        return response.status(204).send();
    }
    catch (error) {

        return response
        .status(400)
        .json({error:error.message});

    }


    }

}
