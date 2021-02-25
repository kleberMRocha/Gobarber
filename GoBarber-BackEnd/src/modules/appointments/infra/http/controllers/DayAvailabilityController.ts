import {Request,Response} from 'express';
import {container} from 'tsyringe';
import dayAvailabilityService from '../../../services/listDayAvailabilityService';

export default class MonthAvailabilityController {

   public async index(request:Request,response:Response):Promise<Response>{

      const {day,month,year} = request.params;
      const provider_id = request.params.provider_id;

        const ListAvailability = container.resolve(dayAvailabilityService);

        try {
            const availability = await ListAvailability.execut({
              day:Number(day),
              month:Number(month),
              provider_id,
              year:Number(year)})

            return response.json(availability);

        } catch (error) {

            console.log(error);

            return response.json(error);

        }


     }


   }
