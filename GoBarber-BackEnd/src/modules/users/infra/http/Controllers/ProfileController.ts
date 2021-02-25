import {Request,Response} from 'express';
import {container} from 'tsyringe';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfile from '../../../services/UpdateProfileService';
import {classToClass} from 'class-transformer';


export default class ProfileController{
    public async show(request:Request,response:Response): Promise<Response | undefined>{
        const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execut({user_id});

    return response.json(user);

}

   public async update(request:Request,response:Response): Promise<Response | undefined>{
    const user_id = request.user.id;

    const {name,password,email, old_password} = request.body;
    const updateProfile = container.resolve(UpdateProfile);

    try {
        const user = await updateProfile
        .execut({
            user_id,
            name,
            password,
            email,
            old_password
        });

        response.status(200).send(classToClass(user));
    }
    catch (error) {
        return response
        .status(400)
        .json({error:error.message});

    }


    }

}
