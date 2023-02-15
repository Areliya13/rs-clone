import { Board, Item, Mark } from '../../schema/model';
import { IBoard, IItem, IMark } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteMarkService = async (markId: string, boardId: string, itemId: string) => {
    if (!boardId || !markId) throw new Error('boardId or markId not transferred')
    await connectToDB()
    const board = await Board.findOneAndUpdate<IBoard>({_id: boardId}, {$pull: {marks: markId}})
    if (!board) throw new Error('boardId does not exist')
    const item = await Item.findOneAndUpdate<IItem>({_id: itemId}, {$pull: {marks: markId}})
    if (!item) throw new Error('itemId does not exist')
    const mark = await Mark.findByIdAndDelete<IMark>(markId)
    if (!mark) throw new Error('markId does not exist')

    return mark
}