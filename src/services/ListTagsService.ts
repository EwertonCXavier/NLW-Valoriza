import { CannotExecuteNotConnectedError, getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import {classToPlain} from "class-transformer"


class ListTagsService {
    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories);

        // Substitui o const por let para permitir alteração de dados
        const tags = await tagsRepositories.find();

        //Modificador de variáveis para permitir a inserção de strings ou emojis na saída
        //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}`}));


        //Cria novos objetos a partir dos objetos já estabelecidos no BD
        return classToPlain(tags);
    }
}

export {ListTagsService}