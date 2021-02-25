import { uuid } from 'uuidv4';
import IApointimentsRepository from '../IApointimentsRepository';
import ICreateAppointmentDto from '../../dto/ICreateAppointmentDto';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import Appointment from '../../../appointments/infra/typeorm/entities/appointment';
import IfindDateRange from '../../dto/IfindDateRange';
import IfindDayRange from '../../dto/IfindDayRange';

class AppotintmentsRepositoty implements IApointimentsRepository {
    private appointments: Appointment[] = [];

    public async findDate(date: Date, provider_id:string): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date)&& appointment.provider_id === provider_id,
        );

        return findAppointment;
    }

    public async findDateRange({
        month,
        provider_id,
        year,
    }: IfindDateRange): Promise<Appointment[]> {
        const findAppointment = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });

        return findAppointment;
    }

    public async findAllInDayFromProvider({
        month,
        provider_id,
        year,
        day
    }: IfindDayRange): Promise<Appointment[]> {
        const findAppointment = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });

        return findAppointment;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDto): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppotintmentsRepositoty;
