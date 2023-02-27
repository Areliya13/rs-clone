import { List } from '../../schema/model';
import { IRef } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const getAllItemsService = async (listId: string) => {
    if (!listId) throw new Error('listId not transferred')
    await connectToDB()
    
    const list = await List.findById(listId).populate(
        {path: 'items', model: IRef.item,
    })
    if (!list) throw new Error('listId not exist')
    return list.items
}