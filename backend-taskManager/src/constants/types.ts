
export const TYPES = {
  // Controllers
  UserController: Symbol.for("UserController"),
  TaskController: Symbol.for("TaskController"),
  // Services
  UserService: Symbol.for("UserService"),
  TaskService: Symbol.for("TaskService"),

  // Middlewares
  AuthMiddleware: Symbol.for("AuthMiddleware"),
};
