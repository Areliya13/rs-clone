import { CheckList, Item } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createChecklist } from '../../utils/createChecklist';

export interface ICreateChecklist {
    itemId: string;
    title: string;
}

export const createChecklistService = async ({itemId, title}:ICreateChecklist) => {
    if (!itemId || !title) throw new Error('title or itemId not transferred')
    await connectToDB()

    const newChecklist = createChecklist(title)
    const item = await Item.findById(itemId)
    if (!item) throw new Error('itemId is not found')
    item.checkLists.push(newChecklist._id)
    await item.save()
    const checklist = await CheckList.create(newChecklist)
    return checklist
}