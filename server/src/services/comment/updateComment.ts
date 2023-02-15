import {  Comment } from '../../schema/model';
import { IComment } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export interface IUpdateCommentProps {
    description?: string;
    commentId: string
}

export const updateCommentService = async ({description, commentId}: IUpdateCommentProps) => {
    if (!commentId) throw new Error('commentId not transferred')
    await connectToDB()
    
    const comment = await Comment.findById(commentId)
    if (!comment) throw new Error('commentId not exist')
    await Comment.findByIdAndUpdate<IComment>(commentId, {
        description: description ? description : comment.description,
    })
    const updatedItem = await Comment.findById(commentId)
    return updatedItem
}