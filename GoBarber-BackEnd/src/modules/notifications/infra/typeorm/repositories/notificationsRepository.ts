import Notification from '../schemas/notification';
import { getMongoRepository, MongoRepository } from 'typeorm';
import INotificationDto from '../../../dto/INotificationDto';
import INotificationsRepository from '../../../repositorires/INotificationsRepository';


class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>;
    constructor() {
        this.ormRepository = getMongoRepository(Notification,'mongo');
    }

    public async create({content,recipient_id}: INotificationDto): Promise<Notification> {

        const notification = this.ormRepository.create({
          content,
          recipient_id
        });

        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;
