import { Types } from "mongoose";
import { IComment } from "../schema/user.types";
import { createId } from "./createId";

interface ICreateCommentProps {
    userId: string
    description: string;
}


export const createComment = ({userId, description}: ICreateCommentProps ): IComment => {
    return {
        _id: createId(),
        date: new Date(),
        description,
        userId: new Types.ObjectId(userId)
    }
}