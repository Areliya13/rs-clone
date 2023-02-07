import { UserList } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';

export const getAllBoardsService = async (userId: string) => {
    if (!userId) throw new Error('Id not transferred').message
    await connectToDB()
    const user = await UserList.findById(userId)
    if (!user) throw new Error('User not found').message
    const allBoards = user?.boards
    return allBoards
}