// import { UserList } from '../../schema/model';
// import { connectToDB } from '../../utils/connectToDB';
// import { isValidId } from '../../utils/isValidId';

// export interface ListsId {
//     boardId: string;
//     userId: string;
// }

// export const getAllListsService = async (listsId: string) => {
//     const {boardId, userId}: ListsId = await JSON.parse(listsId);
//     if (!boardId || !userId) throw new Error('listId is incorrect').message
//     await connectToDB()
//     const isBoardIdIsValid = isValidId(boardId)
//     if (!isBoardIdIsValid) throw new Error('boardId is invalid').message
//     const user = await UserList.findById(userId)
//     if (!user) throw new Error('User not found').message
//     const allBoards = user?.boards.filter((board) => board._id.toString() === boardId)[0]
//     if (!allBoards.lists) throw new Error('lists not exist').message
//     return allBoards.lists
// }