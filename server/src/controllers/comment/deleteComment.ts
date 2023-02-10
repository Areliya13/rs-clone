import { Request, Response } from "express"
import { deleteCommentService } from "../../services/comment/deleteComment"

export const deleteCommentController = async (req: Request, res: Response) => {
    try{
      const itemId = req.body.itemId
      const commentId = req.params.id
      const response = await deleteCommentService(itemId, commentId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}