import { Request, Response } from "express"
import { deleteCheckItemService } from "../../services/checkitem/deleteCheckItem"

export const deleteCheckItemController = async (req: Request, res: Response) => {
    try{
      const checkListId = req.body.checkListId
      const checkItemId = req.params.id
      const response = await deleteCheckItemService(checkListId, checkItemId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(400).send(e)
    }
}