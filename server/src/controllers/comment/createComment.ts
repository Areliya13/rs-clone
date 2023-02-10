import { Request, Response } from "express"
import { createCommentService } from "../../services/comment/createComment";

export const createCommentController = async (req: Request, res: Response) => {
    try{
        const itemId = req.body.itemId
        const userId = req.body.userId
        const description = req.body.description
        const response = await createCommentService({itemId, userId, description})
        res.status(200).send(response)
    }
    catch(e) {
        res.status(404).send(e)
    }
}