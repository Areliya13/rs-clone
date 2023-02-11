import { WorkSpace } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';

export const updateWorkSpaceService = async (workSpaceId: string, title: string) => {
    if (!workSpaceId || !title) throw new Error('workSpaceId or title not transferred').message
    await connectToDB()
    await WorkSpace.findByIdAndUpdate(workSpaceId, {title: title})
    const newWorkSpace = await WorkSpace.findById(workSpaceId)
    return newWorkSpace
}