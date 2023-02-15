import { NextFunction, Request, Response } from "express"
import { deleteMarkService } from "../../services/mark/deleteMark"

export const deleteMarkController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const boardId = req.body.parentId
      const markId = req.params.id
      const response = await deleteMarkService(markId, boardId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}