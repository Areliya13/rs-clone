import { Request, Response } from "express"
import { getAllListsService } from "../../services/list/getAllLists"

export const getAllListsController = async (req: Request, res: Response) => {
    try{
      const boardId = req.params.id
      const response = await getAllListsService(boardId)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(400).send(e)
    }
}