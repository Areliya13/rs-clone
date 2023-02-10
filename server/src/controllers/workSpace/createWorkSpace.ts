import { Request, Response } from "express"
import { createWorkSpaceService } from "../../services/workSpace/createWorkSpace"

export const createWorkSpaceController = async (req: Request, res: Response) => {
    try{
      const userId: string = req.body.userId
      const title: string = req.body.title
      const response = await createWorkSpaceService(userId, title)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}