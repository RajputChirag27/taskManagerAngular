import { Container } from "inversify";
import { UserController } from "../controllers/userController";
import { UserService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { TYPES } from "../constants/types";
import { TaskController } from "../controllers/taskController";
import { TaskService } from "../services/taskService";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<TaskController>(TYPES.TaskController).to(TaskController)

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<TaskService>(TYPES.TaskService).to(TaskService);

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

export default container;
