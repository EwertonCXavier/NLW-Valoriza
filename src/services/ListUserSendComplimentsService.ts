import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";



class ListUserSendComplimentsService{

    async execute(user_id: string){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimentsRepositories.find({
            where: {
                user_sender: user_id
            },
            //  Adiciona o relations para verificar todas as relações que o usuário atual possui
            //  com as demais tabelas -> OBS: Deve estar no formato de objeto, não de variável
            relations: ["userSender", "userReceiver", "tag"]
        })

        return compliments;
    }
}

export {ListUserSendComplimentsService}