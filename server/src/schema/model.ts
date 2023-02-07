import { model } from "mongoose";
import { nameDB } from "../config";
import { userSchema } from "./user";
import { IUser } from "./user.types";

export const UserList = model<IUser>(nameDB, userSchema);