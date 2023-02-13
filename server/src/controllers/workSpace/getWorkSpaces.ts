import { NextFunction, Request, Response } from "express"
import { getAllWorkSpacesService } from "../../services/workSpace/getAllWorkSpaces"

export const getAllWorkSpacesController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const userId = req.params.id
      const response = await getAllWorkSpacesService(userId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}