import { NextFunction, Request, Response } from "express"
import { deleteCommentService } from "../../services/comment/deleteComment"

export const deleteCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const itemId = req.body.parentId
      const commentId = req.params.id
      const response = await deleteCommentService(itemId, commentId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}