import { UserList } from '../../schema/model';
import { IUser } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';
import { isValidId } from '../../utils/isValidId';

export const deleteBoardService = async (userId: string, boardId: string) => {
    if (!userId || !boardId) throw new Error('UserId or boardId not transferred').message
    await connectToDB()
    const user = await UserList.findById(userId)
    if (!user) throw new Error('User not fined')
    const isValidBoardId = isValidId(boardId)
    if (!isValidBoardId) throw new Error('BoardId does not exist').message
    const boards = user?.boards.filter((board) => board._id.toString() !== boardId)
    await UserList.findByIdAndUpdate<IUser>(userId, {boards: boards})

    const response = await UserList.findById(userId)
    return response
}