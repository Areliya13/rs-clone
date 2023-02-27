import { NextFunction, Request, Response } from "express"
import { updateCheckItemService } from "../../services/checkitem/updateCheckItem"

export const updateCheckItemController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const checkItemId = req.params.id
        const title = req.body.title
        const done = req.body.done
      
        const response = await updateCheckItemService({checkItemId, title, done})
        res.status(200).send(response)
    }
    catch(e) {
        next(e);   
    }
}