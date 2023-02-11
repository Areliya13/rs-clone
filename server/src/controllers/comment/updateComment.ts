import { Request, Response } from "express"
import { updateCommentService } from "../../services/comment/updateComment"
import { updateListService } from "../../services/list/updateList"

export const updateCommentController = async (req: Request, res: Response) => {
    try{
        const commentId = req.params.id
        const authorName = req.body.authorName
        const authorImage = req.body.authorImage
        const description = req.body.description
      
        const response = await updateCommentService({authorName, description, authorImage, commentId})
        res.status(200).send(response)
    }
    catch(e) {
        res.status(404).send(e)   
    }
}