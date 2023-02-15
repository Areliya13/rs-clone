import { Board, Item, Mark } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createMark } from '../../utils/createMark';

export interface ICreateMark {
    itemId: string;
    boardId: string;
    color: string;
    title: string;
}

export const createMarkService = async ({itemId, boardId, color, title}:ICreateMark) => {
    if (!itemId || !boardId) throw new Error('boardId or itemId not transferred')
    if (!color || !title) throw new Error('color or title not transferred')
    await connectToDB()

    const newMark = createMark(color, title)
    const item = await Item.findById(itemId)
    if (!item) throw new Error('itemId is not found')
    item.marks.push(newMark._id)
    await item.save()

    const board = await Board.findById(boardId)
    if (!board) throw new Error('board is not found')
    board.marks.push(newMark._id)
    await board.save()

    const mark = await Mark.create(newMark)
    return mark
}