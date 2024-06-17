import { Document, type ObjectId } from "mongoose";

export interface IUser extends Document {
  username?: string;
  email?: string;
  password?: string;
  role?: ObjectId;
  profilePicture?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
  getSignedToken(): string;
  matchPasswords(password: string): boolean;
  setRefreshToken(token: object): string;
}
