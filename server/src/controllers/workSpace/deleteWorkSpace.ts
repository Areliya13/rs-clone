import { Request, Response } from "express"
import { deleteWorkSpaceService } from "../../services/workSpace/deleteWorkSpace"

export const deleteWorkSpaceController = async (req: Request, res: Response) => {
    try{
      const userId = req.body.userId
      const workSpaceId = req.params.id
      const response = await deleteWorkSpaceService(userId, workSpaceId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(400).send(e)
    }
}