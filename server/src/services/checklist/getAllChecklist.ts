import { Item } from '../../schema/model';
import { IRef } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const getAllChecklistService = async (itemId: string) => {
    if (!itemId) throw new Error('itemId not transferred')
    await connectToDB()
    
    const item = await Item.findById(itemId).populate(
        {
            path: 'checkLists', model: IRef.checkList,
            populate: {
                path: 'items',
                model: IRef.checkItem
            }
        })
    if (!item) throw new Error('itemId not exist')
    return item.checkLists
}