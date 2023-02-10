import { List, } from '../../schema/model';
import { IBoard } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export interface IUpdateListProps {
    title?: string;
    listId: string;
}

export const updateListService = async ({listId, title}: IUpdateListProps) => {
    if (!listId) throw new Error('listId not transferred').message
    await connectToDB()

    const list = await List.findById(listId)
    if (!list) throw new Error('list does not exist').message
    await List.findByIdAndUpdate<IBoard>(listId, {
        title: title ? title : list.title
    })
    const updatedBoard = await List.findById(listId)
    return updatedBoard
}