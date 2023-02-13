import { NextFunction, Request, Response } from "express"
import { getAllItemsService } from "../../services/item/getAllItems"

export const getAllItemsController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const listId = req.params.id
      const response = await getAllItemsService(listId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}