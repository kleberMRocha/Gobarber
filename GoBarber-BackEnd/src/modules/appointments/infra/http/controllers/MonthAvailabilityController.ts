import {Request,Response} from 'express';
import {container} from 'tsyringe';
import monthAvailabilityService from '../../../services/listMonthAvailabilityService';

export default class MonthAvailabilityController {

   public async index(request:Request,response:Response):Promise<Response>{

      const {month,year} = request.params;
      const provider_id = request.params.provider_id;

        const ListAvailability = container.resolve(monthAvailabilityService);

        try {

            const availability = await ListAvailability
            .execut({
              month:Number(month),
              provider_id,
              year:Number(year)
            });

            return response.json(availability);

        } catch (error) {

            console.log(error);
            return response.json(error);

        }



     }


   }
