import { CheckItem, CheckList } from '../../schema/model';
import { ICheckList } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteCheckItemService = async (checkListId: string, checkItemId: string) => {
    if (!checkListId || !checkItemId) throw new Error('UserId or boardId not transferred')
    await connectToDB()
    const checklist = await CheckList.findOneAndUpdate<ICheckList>({_id: checkListId}, {$pull: {items: checkItemId}})
    if (!checklist) throw new Error('checklistId does not exist')
    const checkItem = await CheckItem.findByIdAndDelete(checkItemId)
    if (!checkItem) throw new Error('boardId does not exist')

    return checkItem
}