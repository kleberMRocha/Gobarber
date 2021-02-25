import User from '../../users/infra/typeorm/entities/User';
import IApointimentsRepository from '../repositories/IApointimentsRepository'
import AppError from '../../../shared/errors/AppError';
import {inject,injectable} from 'tsyringe';
import {getHours, isAfter} from 'date-fns';


interface IRequest{
    provider_id:string;
    month:number;
    year:number;
    day:number;
}

type IResponse = Array<{
    hour:number;
    available:boolean;
}>

@injectable()
class ListDayhAvailabilityService{

    constructor(
        @inject('appointmentsRepository')
        private appointmentsRepository:IApointimentsRepository
    ){
    }
    public  async execut({provider_id, month, year, day}:IRequest):Promise<IResponse>{

        const appointments = await this.appointmentsRepository
        .findAllInDayFromProvider({
            provider_id,
            day,
            month,
            year
        });

        const hourStart = 8;

        const eachHourArray = Array.from({length:10},(value,index) => index + hourStart);

        const availability = eachHourArray.map(hour => {

            const hasAppointment = appointments.find(appointment => {
               return  getHours(appointment.date) === hour;
            });

            const currentDate = new Date(Date.now());
            const comapreDate = new Date(year,month -1,day, hour);

            return {hour, available:!hasAppointment && isAfter(comapreDate,currentDate)}
        })

          return availability;


    }
}

export default ListDayhAvailabilityService;
