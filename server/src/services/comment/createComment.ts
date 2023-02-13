import { Comment, Item, List, User } from '../../schema/model';
import { connectToDB } from '../../utils/connectToDB';
import { createComment } from '../../utils/createComment';

export interface ICreateComment {
    itemId: string;
    userId: string;
    description: string;
}

export const createCommentService = async ({itemId, userId, description}:ICreateComment) => {
    if (!itemId || !userId) throw new Error('userId or itemId not transferred')
    if (!description) throw new Error('description not transferred')
    await connectToDB()

    const author = await User.findById(userId)
    if (!author) throw new Error('author does not exist')

    const newComment = createComment({authorName: author.name, authorImage: author.image, description})
    const item = await Item.findById(itemId)
    if (!item) throw new Error('itemId is not found')
    item.comments.push(newComment._id)
    await item.save()
    const comment = await Comment.create(newComment)
    return comment
}