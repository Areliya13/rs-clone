import { User, WorkSpace } from '../../schema/model';
import { IUser } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';
import { getPopulatedUser } from '../../utils/getPopulatedUser';

export const deleteWorkSpaceService = async (userId: string, workSpaceId: string) => {
    if (!userId || !workSpaceId) throw new Error('UserId or workSpaceId not transferred')
    await connectToDB()
    const workSpace = await WorkSpace.findByIdAndDelete(workSpaceId)
    if (!workSpace) throw new Error('workSpaceId does not exist')
    const user = await User.findOneAndUpdate<IUser>({_id: userId}, {$pull: {workSpace: workSpaceId}})
    if (!user) throw new Error('userId does not exist')
    const response = await getPopulatedUser(userId)
    return response
}