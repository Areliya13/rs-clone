// import { Request, Response } from "express"
// import { getAllListsService } from "../../services/list/getAllLists"

// export const getAllListsController = async (req: Request, res: Response) => {
//     try{
//       const userId = req.body.listsId
//       const response = await getAllListsService(userId)
//       res.status(200).send(response)
//     }
//     catch(e) {
//       res.status(404).send(e)
//     }
// }