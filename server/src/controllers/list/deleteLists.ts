import { NextFunction, Request, Response } from "express"
import { deleteListService } from "../../services/list/deleteList"

export const deleteListsController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const boardId = req.body.parentId
      const listId = req.params.id
      const response = await deleteListService(boardId, listId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}