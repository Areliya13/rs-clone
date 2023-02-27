import { NextFunction, Request, Response } from "express"
import { createMarkService } from "../../services/mark/createMark";

export const createMarkController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const itemId = req.body.itemId
        const boardId = req.body.boardId
        const color = req.body.color
        const title = req.body.title
        const response = await createMarkService({itemId, boardId, title, color})
        res.status(201).send(response)
    }
    catch(e) {
        next(e);
    }
}