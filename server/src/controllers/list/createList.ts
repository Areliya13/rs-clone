import { NextFunction, Request, Response } from "express"
import { createListService } from "../../services/list/createList";

export const createListController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const boardId = req.body.boardId
        const title = req.body.title
        const response = await createListService({boardId, title})
        res.status(201).send(response)
    }
    catch(e) {
        next(e);
    }
}