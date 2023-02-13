import { Board } from '../../schema/model';
import { IRef } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const getAllListsService = async (boardId: string) => {
    if (!boardId) throw new Error('boardId is undefined')
    await connectToDB()

    const board = await Board.findById(boardId).populate({path: 'lists', model: IRef.list})
    if (!board) throw new Error('User not found')
    return board
}