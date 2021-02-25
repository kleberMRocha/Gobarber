import 'reflect-metadata';
import AppErros from '../../../shared/errors/AppError';
import CreateNewAppointment from './CreateNewAppointment';
import FakeAppointmentsRepository from '../../appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '../../notifications/infra/typeorm/repositories/fakes/fakeNotificationsRepositorys';
import FakechacePovider from '../../../shared/container/Provider/CacheProvider/fakes/fakeCacheProvider';

describe('CreateNewAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeNotificationsRepository = new FakeNotificationsRepository();
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const fakechacePovider = new FakechacePovider();

        const createNewAppointment = new CreateNewAppointment(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakechacePovider
        );

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createNewAppointment.execut({
            provider_id: '5b0c44ff-2ff6-4436-ae36-ff06aae66e91',
            user_id: 'user',
            date: new Date(2020, 4, 10, 15),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe(
            '5b0c44ff-2ff6-4436-ae36-ff06aae66e91',
        );
    });

    it('should not be able to create a new appointment if there is already a same appointment with the same date', async () => {
        const fakeNotificationsRepository = new FakeNotificationsRepository();
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const fakechacePovider = new FakechacePovider();

        const createNewAppointment = new CreateNewAppointment(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakechacePovider
        );

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await createNewAppointment.execut({
            provider_id: '5b0c44ff-2ff6-4436-ae36-ff06aae66e91',
            user_id: 'user',
            date: new Date(2020, 4, 10, 13),
        });

        expect(
            createNewAppointment.execut({
                provider_id: '5b0c44ff-2ff6-4436-ae36-ff06aae66e91',
                user_id: 'user',
                date: new Date(2020, 4, 10, 13),
            }),
        ).rejects.toBeInstanceOf(AppErros);
    });

    it('should not be able to create a new appointment if the date entered has already passed', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const fakeNotificationsRepository = new FakeNotificationsRepository();
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const fakechacePovider = new FakechacePovider();

        const createNewAppointment = new CreateNewAppointment(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakechacePovider
        );

        await expect(
            createNewAppointment.execut({
                provider_id: '5b0c44ff-2ff6-4436-ae36-ff06aae66e91',
                user_id: 'user',
                date: new Date(2020, 3, 10, 12),
            }),
        ).rejects.toBeInstanceOf(AppErros);
    });

    it('should not be able to create whith the same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const fakeNotificationsRepository = new FakeNotificationsRepository();
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const fakechacePovider = new FakechacePovider();

        const createNewAppointment = new CreateNewAppointment(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakechacePovider
        );

        await expect(
            createNewAppointment.execut({
                provider_id: 'user',
                user_id: 'user',
                date: new Date(2020, 4, 10, 13),
            }),
        ).rejects.toBeInstanceOf(AppErros);
    });

    it('should not be able to create an off-hours appointment 8am - 5pm ', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const fakeNotificationsRepository = new FakeNotificationsRepository();
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const fakechacePovider = new FakechacePovider()

        const createNewAppointment = new CreateNewAppointment(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakechacePovider
        );

        await expect(
            createNewAppointment.execut({
                provider_id: 'user',
                user_id: 'provider_id',
                date: new Date(2020, 4, 15, 7),
            }),
        ).rejects.toBeInstanceOf(AppErros);

        await expect(
            createNewAppointment.execut({
                provider_id: 'user',
                user_id: 'provider_id',
                date: new Date(2020, 4, 15, 20),
            }),
        ).rejects.toBeInstanceOf(AppErros);
    });
});

// describe('CreateNewAppointment', () => {
//     it('should not be able to create two appointment on the same date', () => {

//         expect(1+2).toBe(3);

//     });

// });
