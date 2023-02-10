// import { Request, Response } from "express"
// import { createListService } from "../../services/list/createList";

// export const createListController = async (req: Request, res: Response) => {
//     try{
//         const listParams = req.body.listParams
//         if (!listParams) throw new Error('Board not transferred')
//         const response = await createListService(listParams)
//         res.status(200).send(response)
//     }
//     catch(e) {
//         res.status(404).send(e)
//     }
// }