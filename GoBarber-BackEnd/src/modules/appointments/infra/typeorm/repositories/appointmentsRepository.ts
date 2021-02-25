import Appointment from '../entities/appointment';
import { getRepository, Raw, Repository } from 'typeorm';
import IApointimentsRepository from '../../../repositories/IApointimentsRepository';
import ICreateAppointmentDto from '../../../dto/ICreateAppointmentDto';
import IfindDateRange from '../../../dto/IfindDateRange';
import IfindDayRange from '../../../dto/IfindDayRange';

class AppotintmentsRepositoty implements IApointimentsRepository {
    private ormRepository: Repository<Appointment>;
    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findDate(date: Date, provider_id: string): Promise<Appointment | undefined> {

        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id },
        });

        return findAppointment || undefined;
    }

    public async findDateRange({
        month,
        provider_id,
        year,
    }: IfindDateRange): Promise<Appointment[]> {
        const parsedMouth = String(month).padStart(2, '0');

        const appointment = await this.ormRepository.find({

            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') ='${parsedMouth}-${year}'`,
                ),
            },
        });


        return appointment;
    }

    public async findAllInDayFromProvider({
        month,
        provider_id,
        year,
        day,
    }: IfindDayRange): Promise<Appointment[]> {
        const parsedMouth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');

        const Appointment = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName},'DD-MM-YYYY') = '${parsedDay}-${parsedMouth}-${year}'`,
                ),
            },
        });

        return Appointment;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDto): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            user_id,
            date,
        });

        await this.ormRepository.save(appointment);

        console.log(appointment);

        return appointment;
    }
}

export default AppotintmentsRepositoty;
