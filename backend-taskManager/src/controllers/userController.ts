import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../constants";
import { UserService } from "../services/";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../handlers/errorHandler";
import { userSchema } from "../validations";
import { ApiHandler } from "../handlers/apiHandler";
import { CustomError } from "../helpers";
import { statusCode } from "../constants";
import { AuthRequest, IUser } from "../interfaces";
// import { AuthMiddleware } from "../middlewares";

@controller("/user")
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly _userService: UserService,
  ) {}

  // Get Routes
  @httpGet("/")
  async getUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const users = await this._userService.getUsers();
      if (users) {
        res.send(new ApiHandler(users, "Users Fetched Successfully"));
      }
    } catch (err) {
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }

  @httpGet("/profile", TYPES.AuthMiddleware)
  async getUsersProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user._id;
      console.log(id);
      const user = await this._userService.getUsersById(id);
      if (user) {
        res.send(new ApiHandler(user, "User Profile Fetched Successfully"));
      }
    } catch (err) {
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }


  @httpGet("/protected", TYPES.AuthMiddleware)
  public async protected(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.send({
        message: "This is protected Route",
        isAuthorized: true,
      });
    } catch (err) {
      errorHandler(req, res, next, err);
    }
  }

  // Post Routes
  @httpPost("/")
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, email, role, password, profilePicture } = req.body;
      console.log({ username, email, role, password, profilePicture });
      const body = { username, email, role, password, profilePicture };
      const validatedBody = await userSchema.validate(body);
      const user = await this._userService.createUser(validatedBody);
      if (user) {
        res.send(new ApiHandler(user, "User created successfully"));
      } else {
        throw new CustomError(
          "UserNotCreated",
          statusCode.BAD_REQUEST,
          "User is not Created",
        );
      }
    } catch (err) {
      console.error("Error in createUser:", err);
      if (!res.headersSent) {
        errorHandler(req, res, next, err);
      }
    }
  }

  @httpPost("/login")
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const jwtToken = await this._userService.login(email, password);
      req.headers.authorization = `Bearer ${jwtToken}`;
      if (!jwtToken){
        throw new CustomError(
          "User Not Verified",
          statusCode.UNAUTHORIZED,
          "Please Login Again or Create New Account",
        );
      }
        else {
          res.send({ jwtToken, verified: true, message: "User Logged In Successfully" }); 
      }
    } catch (err) {
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }
}
