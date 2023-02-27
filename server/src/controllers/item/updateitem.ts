import { NextFunction, Request, Response } from "express"
import { updateItemService } from "../../services/item/updateItem"

export const updateItemController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const itemId = req.params.id
        const title = req.body.title
        const deadline = req.body.deadline
        const description = req.body.description
        const image = req.body.image
      
        const response = await updateItemService({itemId, title, deadline, description, image})
        res.status(200).send(response)
    }
    catch(e) {
        next(e);   
    }
}