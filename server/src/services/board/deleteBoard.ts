import { Board, WorkSpace } from '../../schema/model';
import { IWork } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteBoardService = async (workSpaceId: string, boardId: string) => {
    if (!workSpaceId || !boardId) throw new Error('UserId or boardId not transferred')
    await connectToDB()
    const work = await WorkSpace.findOneAndUpdate<IWork>({_id: workSpaceId}, {$pull: {boards: boardId}})
    if (!work) throw new Error('workId does not exist')
    const board = await Board.findByIdAndDelete(boardId)
    if (!board) throw new Error('boardId does not exist')

    return board
}