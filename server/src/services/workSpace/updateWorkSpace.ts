import { WorkSpace } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';

export const updateWorkSpaceService = async (workSpaceId: string, title: string) => {
    if (!workSpaceId || !title) throw new Error('workSpaceId or title not transferred').message
    await connectToDB()
    const workspace = await WorkSpace.findByIdAndUpdate(workSpaceId, {title: title})
    if (!workspace) throw new Error('WorkSpace not exist').message
    const newWorkSpace = await WorkSpace.findById(workSpaceId)
    return newWorkSpace
}