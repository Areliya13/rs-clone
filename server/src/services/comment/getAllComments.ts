import { Item } from '../../schema/model';
import { IRef } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const getAllCommentsService = async (itemId: string) => {
    if (!itemId) throw new Error('itemId not transferred')
    await connectToDB()
    
    const item = await Item.findById(itemId).populate(
        {
            path: 'comments', model: IRef.comment,
            populate: {
                path: 'userId', model: IRef.user
            }
        })
    if (!item) throw new Error('itemId not exist')
    return item.comments
}