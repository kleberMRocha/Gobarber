import Appointment from '../infra/typeorm/entities/appointment';
import ICreateAppointmentDto from '../dto/ICreateAppointmentDto';
import IfindDateRange from '../dto/IfindDateRange';
import IfrindDayRange from '../dto/IfindDayRange';

export default interface IAppointmentsRepository {
    create(data:ICreateAppointmentDto): Promise<Appointment>;
    findDate(date: Date, provider_id:string): Promise<Appointment | undefined>;
    findDateRange(data:IfindDateRange):Promise<Appointment[]>
    findAllInDayFromProvider(data:IfrindDayRange):Promise<Appointment[]>

}
