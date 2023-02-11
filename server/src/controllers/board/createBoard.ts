import { Request, Response } from "express"
import { createBoardService } from "../../services/board/createBoard"

export const createBoardController = async (req: Request, res: Response) => {
    try{
      const workSpaceId = req.body.workSpaceId
      const image = req.body.image
      const color = req.body.color
      const title = req.body.title
      const response = await createBoardService({workSpaceId, image, color, title})
      res.status(200).send(response)
    }
    catch(e) {
      res.status(404).send(e)
    }
}