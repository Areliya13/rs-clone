import { NextFunction, Request, Response } from "express"
import { getAllBoardsService } from "../../services/board/getAllBoards"

export const getAllBoardsController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const workSpaceId = req.params.id
      const response = await getAllBoardsService(workSpaceId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}
