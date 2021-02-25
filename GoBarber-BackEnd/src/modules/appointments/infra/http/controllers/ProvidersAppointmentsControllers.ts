import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersAppointments from '../../../services/ListAppointments';

export default class ProvidersAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;

        const { day, month, year } = request.query;

        const listProvidersAppointments = container.resolve(
            ListProvidersAppointments,
        );

        try {

            const appointments = await listProvidersAppointments.execut({
                month:Number(month),
                year:Number(year),
                day:Number(day),
                provider_id: user_id,
            });

            console.log(appointments);

            return response.json(classToClass(appointments));

        } catch (error) {
            console.log(error);
            return response.json(error);
        }
    }
}
