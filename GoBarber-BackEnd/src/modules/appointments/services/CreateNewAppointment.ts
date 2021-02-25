import Appointment from '../infra/typeorm/entities/appointment';
import { getHours, isBefore, parseISO, startOfHour, format } from 'date-fns';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IApointimentsRepository from '../repositories/IApointimentsRepository';
import INotificationsRepository from '../../notifications/repositorires/INotificationsRepository';
import ICacheProvider from '../../../shared/container/Provider/CacheProvider/models/ICacheProvider';

interface IRequestDto {
    provider_id: string;
    user_id: string;
    date: Date | string;
}

@injectable()
class CreateNewAppointment {
    constructor(
        @inject('appointmentsRepository')
        private appointmentsRepository: IApointimentsRepository,
        @inject('notificationsRepository')
        private notificationsRepository: INotificationsRepository,
        @inject('CacheProvider')
        private cacheProvider:ICacheProvider,

    ) {}

    public async execut({
        provider_id,
        user_id,
        date,
    }: IRequestDto): Promise<Appointment> {
        let parsedDate = startOfHour(new Date(date).getTime());

        if (getHours(parsedDate) < 8 || getHours(parsedDate) > 18) {
            throw new AppError('Please schedule at a valid time 8am - 6pm');
        }

        if (isBefore(parsedDate, Date.now())) {
            throw new AppError(
                'You cannot create an appointment with a date that has passed',
            );
        }

        if (provider_id === user_id) {
            throw new AppError(
                'You cannot create an appointment with your own ID',
            );
        }

        const equalDate = await this.appointmentsRepository.findDate(
            parsedDate,
            provider_id,
        );

        if (!equalDate) {
            
            const appointment = await this.appointmentsRepository.create({
                date: parsedDate,
                provider_id,
                user_id,
            });

            const formatDate = format(parsedDate,"dd/MM/yyyy 'às' HH:mm'h'");

            await this.notificationsRepository.create({
                recipient_id:provider_id,
                content:`Ǹovo Agendamento ${formatDate}`
            });

            await this.cacheProvider.invalidate(
                `provider-appointments:${provider_id}:${format(parsedDate, 'yyyy-M-d')}`
            );

            return appointment;
        } else {
            throw new AppError('this appointment is already booked!');
        }
    }
}

export default CreateNewAppointment;
