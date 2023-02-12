import { Request, Response } from "express"
import { deleteListService } from "../../services/list/deleteList"

export const deleteListsController = async (req: Request, res: Response) => {
    try{
      const boardId = req.body.boardId
      const listId = req.params.id
      const response = await deleteListService(boardId, listId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(400).send(e)
    }
}