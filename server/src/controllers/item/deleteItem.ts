import { Request, Response } from "express"
import { deleteItemService } from "../../services/item/deleteItem"

export const deleteItemController = async (req: Request, res: Response) => {
    try{
      const listId = req.body.listId
      const itemId = req.params.id
      const response = await deleteItemService(listId, itemId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(400).send(e)
    }
}