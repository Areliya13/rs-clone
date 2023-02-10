// import { Request, Response } from "express"
// import { updateBoardService } from "../../services/board/updateBoard"

// export const updateBoardController = async (req: Request, res: Response) => {
//     try{
//       const boardId = req.params.id
//       const userId = req.body.userId
//       if (!req.body.boardParams) throw new Error('Board not transferred')
//       const newParams = await JSON.parse(req.body.boardParams)
      
//       const response = await updateBoardService(userId, boardId, newParams)
//       res.status(200).send(response)
//     }
//     catch(e) {
//       res.status(404).send(e)
//     }
// }