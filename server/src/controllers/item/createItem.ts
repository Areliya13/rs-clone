import { Request, Response } from "express"
import { createItemService } from "../../services/item/createItem";

export const createItemController = async (req: Request, res: Response) => {
    try{
        const listId = req.body.listId
        const title = req.body.title
        const response = await createItemService(listId, title)
        res.status(200).send(response)
    }
    catch(e) {
        res.status(404).send(e)
    }
}