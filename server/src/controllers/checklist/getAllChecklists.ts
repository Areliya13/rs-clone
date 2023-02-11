import { Request, Response } from "express"
import { getAllChecklistService } from "../../services/checklist/getAllChecklist"

export const getAllChecklistController = async (req: Request, res: Response) => {
    try{
      const itemId = req.params.id
      const response = await getAllChecklistService(itemId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}