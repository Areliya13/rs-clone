import { Request, Response } from "express"
import { updateBoardService } from "../../services/board/updateBoard"

export const updateBoardController = async (req: Request, res: Response) => {
    try{
        const boardId = req.params.id
        const title = req.body.title
        const image = req.body.image
        const color = req.body.color
      
        const response = await updateBoardService({boardId, color, image, title})
        res.status(200).send(response)
    }
    catch(e) {
        res.status(404).send(e)   
    }
}