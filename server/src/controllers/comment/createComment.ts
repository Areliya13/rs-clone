import { NextFunction, Request, Response } from "express"
import { createCommentService } from "../../services/comment/createComment";

export const createCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const itemId = req.body.itemId
        const userId = req.body.userId
        const description = req.body.description
        const response = await createCommentService({itemId, userId, description})
        res.status(201).send(response)
    }
    catch(e) {
        next(e);
    }
}