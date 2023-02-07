import { Request, Response } from "express"
import { getAllBoardsService } from "../../services/board/getAllBoards"

export const getAllBoardsController = async (req: Request, res: Response) => {
    try{
      const userId = req.body.userId
      const response = await getAllBoardsService(userId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}