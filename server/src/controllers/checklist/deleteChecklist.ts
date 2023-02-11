import { Request, Response } from "express"
import { deleteChecklistService } from "../../services/checklist/deleteChecklist"

export const deleteChecklistController = async (req: Request, res: Response) => {
    try{
      const itemId = req.body.itemId
      const checkListId = req.params.id
      const response = await deleteChecklistService(itemId, checkListId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}