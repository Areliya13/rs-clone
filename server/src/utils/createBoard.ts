import { IBoard } from "../schema/user.types";
import { createId } from "./createId";

export type IBoardProps = Omit<IBoard, "lists">

export const createBoard = async ({title, image, color}: IBoardProps): Promise<IBoard> => {
    return {
        _id: createId(),
        title,
        image,
        color,
        lists: []
    }
}