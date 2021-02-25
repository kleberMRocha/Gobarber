import {Request,Response} from 'express';
import {container} from 'tsyringe';
import sendForgotPasswordEmailService from '../../../services/sendForgotPasswordEmailService';

export default class ForgotPasswordController{
   public async create(request:Request,response:Response): Promise<Response | undefined>{

    const {name,password,email} = request.body;
    const sendForgotPasswordEmail= container.resolve(sendForgotPasswordEmailService);
    try {

        await sendForgotPasswordEmail.execut({email});
        return response.status(200)
        .json({message:`E-mail enviado para ${email}`});
    }
    catch (error) {

        return response
        .status(400)
        .json({error:error.message});

    }


    }

}
