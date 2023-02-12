import { Request, Response } from "express"
import { updateChecklistService } from "../../services/checklist/updateCheklist"

export const updateChecklistController = async (req: Request, res: Response) => {
    try{
        const checkListId = req.params.id
        const title = req.body.title
      
        const response = await updateChecklistService(checkListId, title)
        res.status(200).send(response)
    }
    catch(e) {
        res.status(400).send(e)   
    }
}