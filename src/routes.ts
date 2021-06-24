import {Router} from "express"
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post("/users", createUserController.handle);


//  É possível adicionar o middleware na rota como forma de garantir que determinada condição seja
//  satisfeita (middleware ensureAdmin para a rota de tags como forma de garantir que 
//  somente admins adicionem as tags no sistema)

router.post("/tags", ensureAdmin,  createTagController.handle);
router.post("/session", authenticateUserController.handle);
router.post("/compliments", createComplimentController.handle);
export {router};