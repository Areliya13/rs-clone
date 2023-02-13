import { NextFunction, Request, Response } from "express"
import { getAllCommentsService } from "../../services/comment/getAllComments"

export const getAllCommentsController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const boardId = req.params.id
      const response = await getAllCommentsService(boardId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}