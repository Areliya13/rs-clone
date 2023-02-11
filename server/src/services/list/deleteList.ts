import { Board, List } from '../../schema/model';
import { IBoard } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteListService = async (boardId: string, listsId: string) => {
    if (!boardId || !listsId) throw new Error('listId or boardId not transferred').message
    await connectToDB()
    const board = await Board.findOneAndUpdate<IBoard>({_id: boardId}, {$pull: {lists: listsId}})
    if (!board) throw new Error('BoardId does not exist').message
    const list = await List.findByIdAndDelete(listsId)
    if (!list) throw new Error('ListId does not exist').message

    return list
}