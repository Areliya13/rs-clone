import { CheckList } from '../../schema/model';
import { IRef } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const getAllCheckItemsService = async (checkListId: string) => {
    if (!checkListId) throw new Error('checkListId not transferred').message
    await connectToDB()
    
    const checkList = await CheckList.findById(checkListId).populate({path: 'items', model: IRef.checkItem})
    if (!checkList) throw new Error('checkListId not exist').message
    return checkList
}