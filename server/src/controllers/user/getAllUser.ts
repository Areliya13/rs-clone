import { NextFunction, Request, Response } from "express"
import { getAllUsersService } from "../../services/user/getAllUser"

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const response = await getAllUsersService()
        res.status(200).send(response)
    }
    catch(e) {
        next(e);
    }
}