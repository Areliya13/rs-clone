import { IBoard } from "../schema/user.types";

export type IBoardProps = Omit<IBoard, "lists">

export const createBoard = async ({title, image, color}: IBoardProps): Promise<IBoard> => {
    return {
        title,
        image,
        color,
        lists: []
    }
}