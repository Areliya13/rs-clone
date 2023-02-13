import { Item, List } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createItem } from '../../utils/createItem';

export const createItemService = async (listId:string, title:string) => {
    if (!listId) throw new Error('listId not transferred')
    if (!title) throw new Error('Title not transferred')
    await connectToDB()

    const newItem = createItem(title)
    const list = await List.findById(listId)
    if (!list) throw new Error('listId is not found')
    list.items.push(newItem._id)
    await list.save()
    const item = await Item.create(newItem)
    return item
}