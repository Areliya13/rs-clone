import { Comment, Item } from '../../schema/model';
import { IComment, IItem } from '../../schema/user.types';
import { connectToDB } from '../../utils/connectToDB';

export const deleteCommentService = async (itemId: string, commentId: string) => {
    if (!commentId || !itemId) throw new Error('commentId or itemId not transferred').message
    await connectToDB()
    const item = await Item.findOneAndUpdate<IItem>({_id: itemId}, {$pull: {comments: commentId}})
    if (!item) throw new Error('itemId does not exist').message
    const comment = await Comment.findByIdAndDelete<IComment>(commentId)
    if (!comment) throw new Error('commentId does not exist').message

    return comment
}