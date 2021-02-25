import User from '../../users/infra/typeorm/entities/User';
import IApointimentsRepository from '../repositories/IApointimentsRepository'
import AppError from '../../../shared/errors/AppError';
import {inject,injectable} from 'tsyringe';
import {getDate, getDaysInMonth, isAfter} from 'date-fns';

interface IRequest{
    provider_id:string;
    month:number;
    year:number;
}

type IResponse = Array<{
    day:number;
    available:boolean;
}>

@injectable()
class ListMonthAvailabilityService{

    constructor(
        @inject('appointmentsRepository')
        private appointmentsRepository:IApointimentsRepository
    ){
    }
    public  async execut({provider_id, month, year}:IRequest):Promise<IResponse>{

        const appointments = await this.appointmentsRepository
        .findDateRange({
            provider_id,
            month,
            year
        });

        const numberOfDaysInMonth = getDaysInMonth(new Date(month, year - 1));

        const eachDayArray = Array.from(
            {length: numberOfDaysInMonth},
            (value,index) => index +1
        );


        const availability = eachDayArray.map(day => {

            const compareDates = new Date(year,month -1,day, 23,59,59);

            const appointmentsInDay = appointments.filter(appointment => {
              return getDate(appointment.date) === day;
            });

            return {
              day,
              available: isAfter(compareDates, new Date()) && appointmentsInDay.length < 10,
            };
          });

          return availability;


    }
}

export default ListMonthAvailabilityService;
