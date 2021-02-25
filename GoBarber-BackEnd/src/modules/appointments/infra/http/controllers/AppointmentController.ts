import {Request,Response} from 'express';
import {container} from 'tsyringe';
import CreateNewAppointment from '../../../services/CreateNewAppointment';

export default class AppointmentController {

   public async create(request:Request,response:Response):Promise<Response>{

    try {

        const user_id = request.user.id;
        const { provider_id, date } = request.body;
        const createNewAppointment = container.resolve(CreateNewAppointment);

        const appointment = await createNewAppointment
        .execut({
            provider_id,
            user_id,
            date,
        });

         return response.status(201).json({ appointment });

     } catch (error) {

         return response
         .status(400)
         .json({error:error.message});

     }


   }

}
