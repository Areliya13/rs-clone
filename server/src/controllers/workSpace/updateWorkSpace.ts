import { Request, Response } from "express"
import { updateWorkSpaceService } from "../../services/workSpace/updateWorkSpace"

export const updateWorkSpaceController = async (req: Request, res: Response) => {
    try{
      const workSpaceId = req.params.id
      const title = req.body.title
      const response = await updateWorkSpaceService(workSpaceId, title)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}