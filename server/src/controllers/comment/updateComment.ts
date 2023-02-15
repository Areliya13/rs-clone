import { NextFunction, Request, Response } from "express"
import { updateCommentService } from "../../services/comment/updateComment"

export const updateCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const commentId = req.params.id
        const description = req.body.description
      
        const response = await updateCommentService({description, commentId})
        res.status(200).send(response)
    }
    catch(e) {
        next(e);   
    }
}