import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
    email: string;
    password: string;

}


class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        //Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect");
        }




        //Verificar se senha está correta

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch){
            throw new Error("Email/Password incorrect");
        }
        // 12345 / Senha com hash

        const secret = "6da98232709b4df598cec25f3b677821";

        const token = sign({
            email: user.email,
        }, secret, {
            subject: user.id,
            expiresIn: "1d"
        })

        //Gerar token
        return token;
    }   
}

export {AuthenticateUserService}