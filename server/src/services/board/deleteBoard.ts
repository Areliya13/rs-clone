import { Board, WorkSpace } from '../../schema/model';
import { IWork } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteBoardService = async (workSpaceId: string, boardId: string) => {
    if (!workSpaceId || !boardId) throw new Error('UserId or boardId not transferred').message
    await connectToDB()
    const board = await Board.findByIdAndDelete(boardId)
    if (!board) throw new Error('boardId does not exist').message
    await WorkSpace.findOneAndUpdate<IWork>({_id: workSpaceId}, {$pull: {boards: boardId}})

    return board
}