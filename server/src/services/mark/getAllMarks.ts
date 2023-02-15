import { Board } from '../../schema/model';
import { IRef } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const getAllMarksService = async (boardId: string) => {
    if (!boardId) throw new Error('boardId not transferred')
    await connectToDB()
    
    const board = await Board.findById(boardId).populate(
        {
            path: 'marks', model: IRef.mark,
        })
    if (!board) throw new Error('itemId not exist')
    return board.marks
}