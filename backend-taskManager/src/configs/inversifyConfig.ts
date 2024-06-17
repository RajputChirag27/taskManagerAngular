import { Container } from "inversify";
import { UserController } from "../controllers/userController";
import { UserService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { TYPES } from "../constants/types";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);

container.bind<UserService>(TYPES.UserService).to(UserService);

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

export default container;
