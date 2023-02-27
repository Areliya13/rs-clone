import { Item, List } from '../../schema/model';
import { IList } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteItemService = async (listId: string, itemId: string) => {
    if (!listId || !itemId) throw new Error('listId or itemId not transferred')
    await connectToDB()
    const list = await List.findOneAndUpdate<IList>({_id: listId}, {$pull: {items: itemId}})
    if (!list) throw new Error('listId does not exist')
    const item = await Item.findByIdAndDelete(itemId)
    if (!item) throw new Error('itemId does not exist')

    return item
}