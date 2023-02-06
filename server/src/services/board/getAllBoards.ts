import { UserList } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';

export const getAllBoardsService = async (id: string) => {
    if (!id) throw new Error('Id not transferred').message
    await connectToDB()
    const user = await UserList.findByIdAndDelete(id)
    if (!user) throw new Error('User not found').message
    const allBoards = user?.boards
    return allBoards
}