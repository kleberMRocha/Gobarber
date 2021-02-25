import Appointment from '../../appointments/infra/typeorm/entities/appointment';
import IApointimentsRepository from '../repositories/IApointimentsRepository';
import ICacheProvider from '../../../shared/container/Provider/CacheProvider/models/ICacheProvider';
import {inject,injectable} from 'tsyringe';
import { classToClass } from 'class-transformer';


interface IRequest{
    provider_id:string;
    day:number;
    month:number;
    year:number;
}


@injectable()
class ListAppointments{

    constructor(
        @inject('appointmentsRepository')
        private appointmentsRepository:IApointimentsRepository,

        @inject('CacheProvider')
        private cacheProvider:ICacheProvider

    ){
    }
    public  async execut({provider_id, month, year, day}:IRequest):Promise<Appointment[]>{

        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
        let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

        if(!appointments){

            appointments = await this.appointmentsRepository
            .findAllInDayFromProvider({day,month,provider_id,year});

            console.log('buscou do baco')

            await this.cacheProvider.save(cacheKey,classToClass(appointments));

        }

        return appointments;

    }
}

export default ListAppointments;
