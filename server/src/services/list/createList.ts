// import { UserList } from '../../schema/model';
// import { IList, IUser } from '../../schema/user.types';
// import { connectToDB } from '../../utils/connectToDB';
// import { createList } from '../../utils/createList';
// import { isValidId } from '../../utils/isValidId';
// import { IBoardOptional, updateBoardService } from '../board/updateBoard';

// interface NewParams {
//     userId: string,
//     boardId: string,  
//     title: string  
// }

// export const createListService = async (listParams: string) => {
//     const {boardId, userId, title}: NewParams = await JSON.parse(listParams);
//     if (!boardId || !userId || !title) throw new Error('listParams is incorrect').message
//     await connectToDB();
//     const isValidUserId = isValidId(userId)
//     const isValidBoardId = isValidId(boardId)
//     if (!isValidUserId) throw new Error('userId is invalid').message
//     if (isValidBoardId) throw new Error('boardId is invalid').message
//     const newList = createList(title)
//     const user = await UserList.findById(userId);
//     if (!user) throw new Error('userId is not found')
//     const lists: IList[] = user.boards.filter((board) => board._id.toString() === boardId)[0]?.lists
//     const newParams: IBoardOptional = {lists: [...lists, newList]}
//     const response = await updateBoardService(userId, boardId, newParams)
//     return response
// }