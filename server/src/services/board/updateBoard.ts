import { Board, User } from '../../schema/model';
import { IBoard } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export interface IUpdateBoardProps {
    title?: string;
    color?: string;
    image?: string;
    boardId: string;
}

export const updateBoardService = async ({title, color, image, boardId}: IUpdateBoardProps) => {
    if (!boardId) throw new Error('boardId not transferred').message
    await connectToDB()
    const board = await Board.findById(boardId)
    if (!board) throw new Error('boardId not exist').message
    await Board.findByIdAndUpdate<IBoard>(boardId, {
        title: title ? title : board.title, 
        color: color ? color : board.color,
        image: image ? image : board.image
    })
    const updatedBoard = await Board.findById(boardId)
    return updatedBoard
}