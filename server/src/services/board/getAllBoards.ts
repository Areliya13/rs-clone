import { WorkSpace } from '../../schema/model';
import { IRef } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const getAllBoardsService = async (workSpaceId: string) => {
    if (!workSpaceId) throw new Error('workSpaceId not transferred')
    await connectToDB()
    
    const workSpace = await WorkSpace.findById(workSpaceId).populate({path: 'boards', model: IRef.board})
    if (!workSpace) throw new Error('WorkSpaceId not exist')
    return workSpace
}