import { NextFunction, Request, Response } from "express"
import { deleteWorkSpaceService } from "../../services/workSpace/deleteWorkSpace"

export const deleteWorkSpaceController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const userId = req.body.parentId
      const workSpaceId = req.params.id
      const response = await deleteWorkSpaceService(userId, workSpaceId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}