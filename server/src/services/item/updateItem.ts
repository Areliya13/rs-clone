import { Item } from '../../schema/model';
import { IItem } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export interface IUpdateItemProps {
    itemId: string;
    title?: string;
    image?: string;
    description?: string;
    deadline?: string;
}

export const updateItemService = async ({title, description, deadline, image, itemId}: IUpdateItemProps) => {
    if (!itemId) throw new Error('itemId not transferred')
    await connectToDB()
    const item = await Item.findById(itemId)
    if (!item) throw new Error('boardId not exist')
    await Item.findByIdAndUpdate<IItem>(itemId, {
        title: title ? title : item.title, 
        image: image ? image : item.image,
        description: description ? description : item.description,
        deadline: deadline ? deadline : item.deadline,
    })
    const updatedItem = await Item.findById(itemId)
    return updatedItem
}