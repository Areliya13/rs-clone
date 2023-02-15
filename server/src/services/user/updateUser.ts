import { User, } from '../../schema/model';
import { IUser } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';
import { createIdArray } from '../../utils/createIdArray';

export interface IUpdateUserProps {
    userId: string;
    image?: string;
    name?: string;
    favoriteBoards?: string[];
}

export const updateUserService = async ({userId, image, name, favoriteBoards}: IUpdateUserProps) => {
    if (!userId) throw new Error('userId not transferred')
    await connectToDB()

    const user = await User.findById(userId)
    if (!user) throw new Error('user does not exist')
    await User.findByIdAndUpdate<IUser>(user, {
        name: name ? name : user.name,
        favoriteBoards: favoriteBoards ? createIdArray(favoriteBoards) : user.favoriteBoards,
        image: image ? image : user.image,
    })
    const updatedUser = await User.findById(userId)
    return updatedUser
}