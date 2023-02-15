import { Types } from "mongoose";
import { IMark } from "../schema/user.types";

export const createMark = (color: string, title: string): IMark => {
    return {
        _id: new Types.ObjectId(),
        color,
        title
    }
}