// import { UserList } from '../../schema/model';
// import { IBoard, IUser } from '../../schema/user.types';
// import { connectToDB } from '../../utils/connectToDB';
// import { isValidId } from '../../utils/isValidId';

// export type IBoardOptional = Partial<IBoard>

// export const updateBoardService = async (userId: string, boardId: string, newParams: IBoardOptional) => {
//     if (!userId) throw new Error('UserId not transferred').message
//     await connectToDB()
//     const isValidBoardId = isValidId(boardId)
//     if (!isValidBoardId) throw new Error('Board not found').message
//     const isValidUserId = isValidId(userId)
//     if (!isValidUserId) throw new Error('UserId not found').message
//     const user = await UserList.findById(userId)
//     const userBoards = user?.boards
//     if (!userBoards) throw new Error('UserBoards not found').message
//     const {_id, lists, title, color, image} = userBoards.filter((board) => board._id.toString() === boardId)[0]
//     const newBoard = {lists, color, image, title, ...newParams, _id}
//     const boardsWithoutCurrent = userBoards.filter((board) => board._id.toString() !== boardId)
//     const newBoards = [...boardsWithoutCurrent, newBoard]
//     await UserList.findByIdAndUpdate<IUser>(userId, {boards: newBoards})
//     const response = await UserList.findById(userId)
//     return response
// }