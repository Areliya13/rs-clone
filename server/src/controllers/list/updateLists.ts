import { NextFunction, Request, Response } from "express"
import { updateListService } from "../../services/list/updateList"

export const updateListsController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const listId = req.params.id
        const title = req.body.title 
        let item: string[] | undefined
        if (req.body.item) {
          item = await JSON.parse(req.body.item)
        }

        const response = await updateListService({listId, title, item})
        res.status(200).send(response)
    }
    catch(e) {
        next(e);   
    }
}