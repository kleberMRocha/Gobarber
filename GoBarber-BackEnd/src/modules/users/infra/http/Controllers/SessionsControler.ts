import {Request,Response} from 'express';
import {container} from 'tsyringe';
import CreateSession from '../../../services/CreateSession';
import {classToClass} from 'class-transformer';

export default class SessionContoller{
   public async create(request:Request,response:Response): Promise<Response | undefined>{

    const createSession = container.resolve(CreateSession);
    const {password,email} = request.body;

    try {
      await createSession.execut({password,email})
      .then(authenticateUser => response
        .status(200).send(classToClass(authenticateUser)));

    }
    catch (error) {

        return response
        .status(400)
        .json({error:error.message});

    }


    }
}
