// import { UserList } from '../../schema/model';
// import { IUser } from '../../schema/user.types';
// import { connectToDB } from '../../utils/connectToDB';
// import { isValidId } from '../../utils/isValidId';
// import { ListsId } from './getAllLists';



// export const deleteListService = async (listId: string, listsId: string) => {
//     if (!listId || !listsId) throw new Error('listId or listsId not transferred').message
//     const {boardId, userId}: ListsId = await JSON.parse(listsId);
//     if (!boardId || !userId) throw new Error('listParams is incorrect').message
//     await connectToDB()
//     const user = await UserList.findById(userId)
//     if (!user) throw new Error('User not fined')
//     const isValidBoardId = isValidId(boardId)
//     if (!isValidBoardId) throw new Error('BoardId does not exist').message
//     // const board = user?.boards.filter((board) => board._id.toString() === boardId)[0]
//     // const boards = user?.boards.map((board) => {
//     //     if (board._id.toString() !== boardId) {
            
//     //     }
//     //     board._id.toString() !== boardId)
//     // }
//     // await UserList.findByIdAndUpdate<IUser>(userId, {boards: []})

//     // const response = await UserList.findById(userId)
//     // return response
// }