import { CheckItem } from '../../schema/model';
import { ICheckItem } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export interface IUpdateCheckItemProps {
    title?: string;
    done?: boolean;
    checkItemId: string;
}

export const updateCheckItemService = async ({checkItemId, title, done}: IUpdateCheckItemProps) => {
    if (!checkItemId) throw new Error('boardId not transferred')
    await connectToDB()
    const checkItem = await CheckItem.findById(checkItemId)
    if (!checkItem) throw new Error('checkItemId not exist')
    await CheckItem.findByIdAndUpdate<ICheckItem>(checkItemId, {
        title: title ? title : checkItem.title, 
        done: done ? done : checkItem.done,
    })
    const updatedCheckItem = await CheckItem.findById(checkItemId)
    return updatedCheckItem
}