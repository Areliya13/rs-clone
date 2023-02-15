import { NextFunction, Request, Response } from "express"
import { updateUserService } from "../../services/user/updateUser"

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.params.id
        const image = req.body.image
        const name = req.body.name
        const favoriteBoards: string[] = JSON.parse(req.body.favoriteBoards)
      
        const response = await updateUserService({userId, image, name, favoriteBoards})
        res.status(200).send(response)
    }
    catch(e) {
        next(e);   
    }
}