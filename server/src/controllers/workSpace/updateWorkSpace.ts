import { NextFunction, Request, Response } from "express"
import { updateWorkSpaceService } from "../../services/workSpace/updateWorkSpace"

export const updateWorkSpaceController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const workSpaceId = req.params.id
      const title = req.body.title
      const response = await updateWorkSpaceService(workSpaceId, title)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}