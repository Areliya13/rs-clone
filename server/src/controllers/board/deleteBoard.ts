import { NextFunction, Request, Response } from "express"
import { deleteBoardService } from "../../services/board/deleteBoard"

export const deleteBoardController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const workSpaceId = req.body.parentId
      const boardId = req.params.id
      const response = await deleteBoardService(workSpaceId, boardId)
      res.status(200).send(response)
    }
    catch(e) {
      next(e);
    }
}