import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListDayAvailabilityService from './listDayAvailabilityService';

const fakeAppointmentsRepository = new FakeAppointmentsRepository();
const listDayAvailabilityService = new ListDayAvailabilityService(fakeAppointmentsRepository);

describe('listMonthAvailabilityService', () => {

  it('should be able to list the day availability from provider', async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id:"user_id",
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id:"user_id",
        date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id:"user_id",
        date: new Date(2020, 4, 20, 17, 0, 0),
    });


    jest.spyOn(Date,'now').mockImplementation(() => {

        return  new Date(2020,4,20,10,0,0).getTime();

    });

    const availability = await listDayAvailabilityService.execut({
        provider_id: 'user',
        year: 2020,
        month: 5,
        day:20
      });

      expect(availability).toEqual(
        expect.arrayContaining(
            [{"available": false, "hour": 8},
             {"available": false, "hour": 9},
             {"available": false, "hour": 10},
             {"available": false, "hour": 11},
             {"available": true, "hour": 12},
             {"available": true, "hour": 13},
             {"available": true, "hour": 14},
             {"available": true, "hour": 15},
             {"available": true, "hour": 16},
             {"available": false , "hour": 17}]
        ),
      );

  });



});
