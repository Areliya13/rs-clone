import { Types } from "mongoose";
import { IBoard } from "../schema/user.types";
import { createId } from "./createId";

export interface IBoardProps {
    title: string;
    image: string | undefined;
    color: string | undefined;
    workSpaceId: string;
}

export const createBoard = ({title, image, color, workSpaceId}: IBoardProps): IBoard => {
    return {
        _id: createId(),
        title,
        image,
        color,
        lists: [],
        marks: [],
        workSpaceId: new Types.ObjectId(workSpaceId)
    }
}