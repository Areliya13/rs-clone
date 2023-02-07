import { Request, Response } from "express"
import { deleteBoardService } from "../../services/board/deleteBoard"

export const deleteBoardController = async (req: Request, res: Response) => {
    try{
      const userId = req.body.userId
      const boardId = req.params.id
      const response = await deleteBoardService(userId, boardId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}