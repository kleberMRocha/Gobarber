import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListAppointments from './ListAppointments';
import FakechacePovider from '../../../shared/container/Provider/CacheProvider/fakes/fakeCacheProvider';

const fakeAppointmentsRepository = new FakeAppointmentsRepository();
const fakechacePovider = new FakechacePovider();

const listAppointments = new ListAppointments(fakeAppointmentsRepository,fakechacePovider);

describe('ListProvidersAppointments', () => {

  it('should be able to list the appointments of a specific day', async () => {

   const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id:"user_id",
      date: new Date(2021, 4, 20, 14, 0, 0),
    });

   const appointment2 = await fakeAppointmentsRepository.create({
        provider_id: 'provider',
        user_id:"user_id",
        date: new Date(2021, 4, 20, 10, 0, 0),
    });

   const appointment3 =  await fakeAppointmentsRepository.create({
        provider_id: 'provider',
        user_id:"user_id",
        date: new Date(2021, 4, 20, 17, 0, 0),
    });


    const availability = await listAppointments.execut({
        provider_id: 'provider',
        year: 2021,
        month: 5,
        day:20
      });

      expect(availability).toEqual([appointment1,appointment2,appointment3]);

  });


});
