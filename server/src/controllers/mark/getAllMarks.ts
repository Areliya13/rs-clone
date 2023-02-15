import { NextFunction, Request, Response } from "express"
import { getAllMarksService } from "../../services/mark/getAllMarks"

export const getAllMarksController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const boardId = req.params.id
      const response = await getAllMarksService(boardId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}