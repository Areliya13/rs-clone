import { NextFunction, Request, Response } from "express"
import { updateMarkService } from "../../services/mark/updateMark"

export const updateMarkController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const markId = req.params.id
        const title = req.body.title
        const color = req.body.color
      
        const response = await updateMarkService({color, markId, title})
        res.status(200).send(response)
    }
    catch(e) {
        next(e);   
    }
}