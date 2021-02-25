import {Request,Response} from 'express';
import {container} from 'tsyringe';
import lisAppointmentService from '../../../services/ListProvidersService';

export default class ProvidersController {

   public async index(request:Request,response:Response):Promise<Response>{
       const user_id = request.user.id;
        const listProviders = container.resolve(lisAppointmentService);

        const provides = await listProviders.execut({user_id:user_id})

        return response.json(provides);

     }


   }


