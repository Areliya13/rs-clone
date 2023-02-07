import express from 'express';
import { port as expressPort } from './src/config';
import { createBoardController, deleteBoardController, getAllBoardsController, updateBoardController } from './src/controllers/board/index';
import { Path } from './src/types/path';

const app = express()
const port = expressPort || 3000
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Board section
app.post(Path.board, createBoardController)
app.get(Path.board, getAllBoardsController)
app.delete(Path.boardWithId, deleteBoardController)
app.put(Path.boardWithId, updateBoardController)

app.listen(port, () => { 
  console.log(`Trello app listening on port ${port}`)
})