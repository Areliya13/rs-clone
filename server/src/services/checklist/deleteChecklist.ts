import { CheckList, Item } from '../../schema/model';
import { ICheckList, IItem } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteChecklistService = async (itemId: string, checkListId: string) => {
    if (!checkListId || !itemId) throw new Error('checkListId or itemId not transferred')
    await connectToDB()
    const item = await Item.findOneAndUpdate<IItem>({_id: itemId}, {$pull: {checkLists: checkListId}})
    if (!item) throw new Error('itemId does not exist')
    const checklist = await CheckList.findByIdAndDelete<ICheckList>(checkListId)
    if (!checklist) throw new Error('checkListId does not exist')

    return checklist
}