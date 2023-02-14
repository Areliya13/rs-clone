import { NextFunction, Request, Response } from "express"
import { deleteChecklistService } from "../../services/checklist/deleteChecklist"

export const deleteChecklistController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const itemId = req.body.parentId
      const checkListId = req.params.id
      const response = await deleteChecklistService(itemId, checkListId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}