import { classToClass } from 'class-transformer';
import {Request,Response} from 'express';
import {container} from 'tsyringe';
import UpdateAvatarImage from '../../../services/UpdateAvatarImage';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
      const updateUserAvatar = container.resolve(UpdateAvatarImage);
      
      const {id} = request.body;
      const avatar = request.file;

      try {

       const user =  await updateUserAvatar.execut({
          file:avatar, userId:id
        });

        return response.json(user);


      } catch (error) {
        return response.json(error);
      }
     
      
     
    }
  }