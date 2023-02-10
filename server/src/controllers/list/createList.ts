import { Request, Response } from "express"
import { createListService } from "../../services/list/createList";

export const createListController = async (req: Request, res: Response) => {
    try{
        const boardId = req.body.boardId
        const title = req.body.title
        const response = await createListService({boardId, title})
        res.status(200).send(response)
    }
    catch(e) {
        res.status(404).send(e)
    }
}