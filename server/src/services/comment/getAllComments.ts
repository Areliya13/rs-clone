import { Item } from '../../schema/model';
import { IRef } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const getAllCommentsService = async (itemId: string) => {
    if (!itemId) throw new Error('itemId not transferred').message
    await connectToDB()
    
    const item = await Item.findById(itemId).populate(
        {
            path: 'comments', model: IRef.comment
        })
    if (!item) throw new Error('itemId not exist').message
    return item.comments
}