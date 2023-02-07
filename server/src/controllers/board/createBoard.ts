import { Request, Response } from "express"
import { createBoardService } from "../../services/board/createBoard"

export const createBoardController = async (req: Request, res: Response) => {
    try{
      const userId = req.body.id
      const response = await createBoardService(userId, req.body)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}