import { Board, List } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createList } from '../../utils/createList';

export interface createListProps {
    boardId: string,  
    title: string  
}

export const createListService = async ({boardId, title}: createListProps) => {
    if (!boardId || !title) throw new Error('boardId or title is undefined')
    await connectToDB();

    const newList = createList(title)
    const board = await Board.findById(boardId);
    if (!board) throw new Error('boardId is not found')
    board.lists.push(newList._id)
    await board.save()
    const list = await List.create(newList)
    return list
}