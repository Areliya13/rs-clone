import { NextFunction, Request, Response } from "express"
import { getAllChecklistService } from "../../services/checklist/getAllChecklist"

export const getAllChecklistController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const itemId = req.params.id
      const response = await getAllChecklistService(itemId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}