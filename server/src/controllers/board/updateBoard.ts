import { NextFunction, Request, Response } from "express"
import { updateBoardService } from "../../services/board/updateBoard"

export const updateBoardController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const boardId = req.params.id
        const title = req.body.title
        const image = req.body.image
        const color = req.body.color
      
        const response = await updateBoardService({boardId, color, image, title})
        res.status(200).send(response)
    }
    catch(e) {
        next(e);   
    }
}