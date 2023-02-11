import { Request, Response } from "express"
import { getAllWorkSpacesService } from "../../services/workSpace/getAllWorkSpaces"

export const getAllWorkSpacesController = async (req: Request, res: Response) => {
    try{
      const userId = req.params.id
      const response = await getAllWorkSpacesService(userId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}