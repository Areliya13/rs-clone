import { Request, Response } from "express"
import { updateListService } from "../../services/list/updateList"

export const updateListsController = async (req: Request, res: Response) => {
    try{
        const listId = req.params.id
        const title = req.body.title
      
        const response = await updateListService({listId, title})
        res.status(200).send(response)
    }
    catch(e) {
        res.status(404).send(e)   
    }
}