import { Board, Mark } from '../../schema/model';
import { IBoard, IMark } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteMarkService = async (markId: string, boardId: string) => {
    if (!boardId || !markId) throw new Error('boardId or markId not transferred')
    await connectToDB()
    const board = await Board.findOneAndUpdate<IBoard>({_id: boardId}, {$pull: {marks: markId}})
    if (!board) throw new Error('boardId does not exist')
    const mark = await Mark.findByIdAndDelete<IMark>(markId)
    if (!mark) throw new Error('markId does not exist')

    return mark
}