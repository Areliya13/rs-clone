import { NextFunction, Request, Response } from "express"
import { getAllCheckItemsService } from "../../services/checkitem/getAllCheckItems"

export const getAllCheckItemsController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const checkListId = req.params.id
      const response = await getAllCheckItemsService(checkListId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}
