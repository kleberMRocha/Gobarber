class AppErros{
   public readonly message:string;
   public readonly statusCode:number;

   constructor(message:string,statusCode = 400){
       this.statusCode = statusCode;
       this.message = message;
   }

}

export default AppErros;
