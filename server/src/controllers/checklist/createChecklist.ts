import { NextFunction, Request, Response } from "express"
import { createChecklistService } from "../../services/checklist/createChecklist";

export const createChecklistController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const itemId = req.body.itemId
        const title = req.body.title
        const response = await createChecklistService({itemId, title})
        res.status(201).send(response)
    }
    catch(e) {
        next(e);
    }
}