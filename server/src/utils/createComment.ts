import { IComment } from "../schema/user.types";
import { createId } from "./createId";

interface ICreateCommentProps {
    authorName: string;
    authorImage?: string;
    description: string;
}


export const createComment = ({authorName, authorImage, description}: ICreateCommentProps ): IComment => {
    return {
        _id: createId(),
        authorName,
        authorImage,
        date: new Date(),
        description
    }
}