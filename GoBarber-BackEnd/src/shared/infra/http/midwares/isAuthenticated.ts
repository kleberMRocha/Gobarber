import {Request,Response,NextFunction} from 'express';
import jsonwebtoken from 'jsonwebtoken';
import AppError from '../../../errors/AppError';

interface Payload{

  email: string,
  iat: number,
  exp: number,
  sub: string

}

const secrete:any = process.env.APP_SECRETE;


function isAuthenticated(request:Request,response:Response,next:NextFunction):void{

    const authHeaders = request.headers.token;
    console.log(authHeaders);
   
    if(!authHeaders){
        throw new AppError('credentials are invalid!',401);
    }

   const [,token] = (String(authHeaders).split(' '));

     try {
        const decoded = jsonwebtoken.verify(token,secrete);
        const {sub} = decoded as Payload;

        request.user = {
            id:sub
        }
        return next();
     } catch (error) {
        console.log(error);
        throw new AppError('credentials are invalid!',401);
     }



}


export default isAuthenticated;
