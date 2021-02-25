import INotificationDto from '../dto/INotificationDto';
import Notification from '../infra/typeorm/schemas/notification';


export default interface INotificationRepository{
    create(data:INotificationDto):Promise<Notification>;
}
