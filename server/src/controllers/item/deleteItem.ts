import { NextFunction, Request, Response } from "express"
import { deleteItemService } from "../../services/item/deleteItem"

export const deleteItemController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const listId = req.body.parentId
      const itemId = req.params.id
      const response = await deleteItemService(listId, itemId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}