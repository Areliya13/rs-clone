import { List, } from '../../schema/model';
import { IBoard } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';
import { createIdArray } from '../../utils/createIdArray';

export interface IUpdateListProps {
    title?: string;
    listId: string;
    item?: string[];
}

export const updateListService = async ({listId, title, item}: IUpdateListProps) => {
    if (!listId) throw new Error('listId not transferred')
    await connectToDB()

    const list = await List.findById(listId)
    if (!list) throw new Error('list does not exist')
    await List.findByIdAndUpdate<IBoard>(listId, {
        title: title ? title : list.title,
        items: item ? createIdArray(item) : list.items
    })
    const updatedBoard = await List.findById(listId)
    return updatedBoard
}