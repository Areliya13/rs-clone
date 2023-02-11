import { IBoard } from "../schema/user.types";
import { createId } from "./createId";

export type IBoardProps = Omit<IBoard, "lists" | "_id">

export const createBoard = ({title, image, color}: IBoardProps): IBoard => {
    return {
        _id: createId(),
        title,
        image,
        color,
        lists: []
    }
}