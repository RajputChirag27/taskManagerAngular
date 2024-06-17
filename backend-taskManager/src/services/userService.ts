import { injectable } from "inversify";
import { IUser } from "../interfaces";
import { User } from "../models";
import { CustomError } from "../helpers";
import { statusCode } from "../constants";
import { messages } from "../constants";

@injectable()
export class UserService {
  constructor() {}

  async getUsers() {
    return await User.find().exec();
  }

  async createUser(body: any): Promise<IUser> {
    const user = new User(body);
    const result = await user.save();
    if (!result) {
      throw new CustomError(
        messages.User_Not_Created.name,
        statusCode.BAD_REQUEST,
        messages.User_Not_Created.message,
      );
    }
    return result;
  }

  async login(email : string, password : string) {
    const user: IUser | null = await User.findOne({ email: email });
    if (!user) {
      throw new CustomError(
        messages.INVALID_CREDENTIALS.name,
        statusCode.UNAUTHORIZED,
        messages.INVALID_CREDENTIALS.message,
      );
    }
    const matchPasswords = await user.matchPasswords(password);
    if (!matchPasswords) {
      throw new CustomError(
        messages.INVALID_CREDENTIALS.name,
        statusCode.UNAUTHORIZED,
        messages.INVALID_CREDENTIALS.message,
      );
    }
    if (user && matchPasswords) {
      const token: string = await user.getSignedToken();
      const refreshToken: string = await user.getSignedToken();
      await User.findOneAndUpdate(
        { email: email },
        { $set: { refreshToken: refreshToken } },
        { new: true },
      );
      return token;
    }
    return null;
  }
}
