import {  CheckList } from '../../schema/model';
import { ICheckList} from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const updateChecklistService = async (checkListId: string, title: string) => {
    if (!checkListId) throw new Error('checkList not transferred')
    await connectToDB()
    
    const checklist = await CheckList.findById(checkListId)
    if (!checklist) throw new Error('checkList not exist')
    await CheckList.findByIdAndUpdate<ICheckList>(checkListId, {
        title: title ? title : checklist.title
    })
    const updatedItem = await CheckList.findById(checkListId)
    return updatedItem
}