import { NextFunction, Request, Response } from "express"
import { deleteCheckItemService } from "../../services/checkitem/deleteCheckItem"

export const deleteCheckItemController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const checkListId = req.body.parentId
      const checkItemId = req.params.id
      const response = await deleteCheckItemService(checkListId, checkItemId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}