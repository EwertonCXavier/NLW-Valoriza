import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {classToPlain} from "class-transformer"

class ListUsersService{
    async execute(){
        const listUsersService = getCustomRepository(UsersRepositories);

        const user = await listUsersService.find();

        return classToPlain(user);
    }
}

export {ListUsersService}