import { NextFunction, Request, Response } from "express"
import { createItemService } from "../../services/item/createItem";

export const createItemController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const listId = req.body.listId
        const title = req.body.title
        const response = await createItemService(listId, title)
        res.status(201).send(response)
    }
    catch(e) {
        next(e);
    }
}