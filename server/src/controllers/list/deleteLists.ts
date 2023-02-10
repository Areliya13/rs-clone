// import { Request, Response } from "express"
// import { deleteListService } from "../../services/list/deleteList"

// export const deleteListsController = async (req: Request, res: Response) => {
//     try{
//       const listsId = req.body.listsId
//       const listId = req.params.id
//       const response = await deleteListService(listId, listsId)
//       res.status(200).send(response)
//     }
//     catch(e) {
//       res.status(404).send(e)
//     }
// }