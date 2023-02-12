import { Request, Response } from "express"
import { createCheckItemService } from "../../services/checkItem/createCheckItem"

export const createCheckItemController = async (req: Request, res: Response) => {
    try{
      const checkListId = req.body.checkListId
      const title = req.body.title
      const response = await createCheckItemService({checkListId, title})
      res.status(201).send(response)
    }
    catch(e) {
      res.status(400).send(e)
    }
}