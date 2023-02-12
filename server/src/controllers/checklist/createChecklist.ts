import { Request, Response } from "express"
import { createChecklistService } from "../../services/checklist/createChecklist";

export const createChecklistController = async (req: Request, res: Response) => {
    try{
        const itemId = req.body.itemId
        const title = req.body.title
        const response = await createChecklistService({itemId, title})
        res.status(201).send(response)
    }
    catch(e) {
        res.status(400).send(e)
    }
}