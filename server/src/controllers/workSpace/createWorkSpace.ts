import { NextFunction, Request, Response } from "express"
import { createWorkSpaceService } from "../../services/workSpace/createWorkSpace"

export const createWorkSpaceController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const userId: string = req.body.userId
      const title: string = req.body.title
      const response = await createWorkSpaceService(userId, title)
      res.status(201).send(response)
    }
    catch(e) {
      next(e);
    }
}