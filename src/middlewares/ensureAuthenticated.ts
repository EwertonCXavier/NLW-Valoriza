import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken"

interface IPayload{
    sub: string;
}


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    //  Receber token
    const authToken = request.headers.authorization;

    //  Validar se token está preenchido
    if(!authToken){
        return response.status(401).end();
    }

    //Estratégia usada para pegar o token [, token]
    const [,token] = authToken.split(" ");
    const secret = "6da98232709b4df598cec25f3b677821";


    try{
        //  Validar token
        const {sub} = verify(token, secret) as IPayload;
        

        //  Recuperar informações do usuário
        request.user_id = sub ;
        
        return next();
        
    }catch(err){
        return response.status(401).end();
    }


    




    

    

}