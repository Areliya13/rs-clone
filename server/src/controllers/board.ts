import { Request, Response } from "express"
import { createBoardService } from "../services/board"

export const createBoardController = async (req: Request, res: Response) => {
    try{
      const id = req.body.id
      const response = await createBoardService(id, req.body)
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}