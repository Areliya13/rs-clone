import { Request, Response } from "express"
import { updateCheckItemService } from "../../services/checkitem/updateCheckItem"

export const updateCheckItemController = async (req: Request, res: Response) => {
    try{
        const checkItemId = req.params.id
        const title = req.body.title
        const done = req.body.done
      
        const response = await updateCheckItemService({checkItemId, title, done})
        res.status(200).send(response)
    }
    catch(e) {
        res.status(404).send(e)   
    }
}