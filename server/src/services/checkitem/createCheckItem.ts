import { CheckItem, CheckList } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createCheckItem } from '../../utils/createCheckItem';

export interface createCheckItemIdProps {
    checkListId: string;
    title: string;
}

export const createCheckItemService = async ({checkListId, title}: createCheckItemIdProps) => {
    if (!checkListId) throw new Error('checkListId not transferred')
    if (!title) throw new Error('Title not transferred')
  
    await connectToDB()

    const newCheckItem = createCheckItem(title)
    const checkList = await CheckList.findById(checkListId)
    if (!checkList) throw new Error('checkListId is not found')
    checkList.items.push(newCheckItem._id)
    await checkList.save()
    const board = await CheckItem.create(newCheckItem)
    return board
}