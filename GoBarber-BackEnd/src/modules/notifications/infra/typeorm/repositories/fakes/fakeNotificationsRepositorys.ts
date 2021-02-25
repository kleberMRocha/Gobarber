import Notification from '../../schemas/notification';
import {ObjectID} from 'mongodb';
import INotificationDto from '../../../../dto/INotificationDto';
import INotificationsRepository from '../../../../repositorires/INotificationsRepository';


class NotificationsRepository implements INotificationsRepository {

    private notifications:Notification[] = [];

    public async create({content,recipient_id}: INotificationDto): Promise<Notification> {

        const notification = new Notification();

        Object.assign(notification, {
            id: new ObjectID(),
            content,
            recipient_id
        })

        this.notifications.push(notification);

        return notification;
    }
}

export default NotificationsRepository;
