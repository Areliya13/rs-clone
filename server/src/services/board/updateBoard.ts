import { Board } from '../../schema/model';
import { IBoard } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';
import { createIdArray } from '../../utils/createIdArray';

export interface IUpdateBoardProps {
    title?: string;
    color?: string;
    image?: string;
    boardId: string;
    list?: string[];
}

export const updateBoardService = async ({title, color, image, boardId, list}: IUpdateBoardProps) => {
    if (!boardId) throw new Error('boardId not transferred')
    await connectToDB()
    const board = await Board.findById(boardId)
    if (!board) throw new Error('boardId not exist')

    if (title) {
        await Board.findByIdAndUpdate<IBoard>(boardId, {
            title: title ? title : board.title, 
            color: color ? color: board.color,
            image: image ? image : board.image,
            lists: list ? createIdArray(list) : board.lists
        })
    } else if (color && !title && !image) {
        await Board.findByIdAndUpdate<IBoard>(boardId, {
            title: board.title, 
            color: color,
            image: '',
            lists: list ? createIdArray(list) : board.lists
        })
    } else if (image && !title && !color) {
        await Board.findByIdAndUpdate<IBoard>(boardId, {
            title: board.title, 
            color: '',
            image: image,
            lists: list ? createIdArray(list) : board.lists
        })
    }
    const updatedBoard = await Board.findById(boardId)
    return updatedBoard
}