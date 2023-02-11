import {  Comment } from '../../schema/model';
import { IComment } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export interface IUpdateCommentProps {
    authorName?: string;
    authorImage?: string;
    description?: string;
    commentId: string
}

export const updateCommentService = async ({authorName, description, authorImage, commentId}: IUpdateCommentProps) => {
    if (!commentId) throw new Error('commentId not transferred').message
    await connectToDB()
    
    const comment = await Comment.findById(commentId)
    if (!comment) throw new Error('commentId not exist').message
    await Comment.findByIdAndUpdate<IComment>(commentId, {
        authorName: authorName ? authorName : comment.authorName, 
        authorImage: authorImage ? authorImage : comment.authorImage,
        description: description ? description : comment.description,
    })
    const updatedItem = await Comment.findById(commentId)
    return updatedItem
}