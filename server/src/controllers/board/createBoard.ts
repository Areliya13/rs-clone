import { NextFunction, Request, Response } from "express"
import { createBoardService } from "../../services/board/createBoard"

export const createBoardController = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const workSpaceId = req.body.workSpaceId
      const image = req.body.image
      const color = req.body.color
      const title = req.body.title
      const response = await createBoardService({workSpaceId, image, color, title})
      res.status(201).send(response)
    }
    catch(e) {
      next(e);
    }
}