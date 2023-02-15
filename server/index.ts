import express from 'express';
import cors from 'cors';
import { port as expressPort } from './src/config';
import { Path } from './src/types/path';
import { createWorkSpaceController, deleteWorkSpaceController, getAllWorkSpacesController, updateWorkSpaceController } from './src/controllers/workSpace/index';
import { getAllUsersController, updateUserController } from './src/controllers/user/index';
import { createBoardController, deleteBoardController, getAllBoardsController, updateBoardController } from './src/controllers/board/index';
import { createListController, deleteListsController, getAllListsController, updateListsController } from './src/controllers/list/index';
import { createItemController, deleteItemController, getAllItemsController, updateItemController } from './src/controllers/item/index';
import { createCommentController, deleteCommentController, getAllCommentsController, updateCommentController } from './src/controllers/comment/index';
import { createChecklistController, deleteChecklistController, getAllChecklistController, updateChecklistController } from './src/controllers/checklist/index';
import { createCheckItemController, deleteCheckItemController, getAllCheckItemsController, updateCheckItemController } from './src/controllers/checkitem/index';
import { ErrorHandler } from './src/middleware/errorHandler';
import { createMarkController, deleteMarkController, getAllMarksController, updateMarkController } from './src/controllers/mark/index';

const app = express()
const port = expressPort || 3000


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//User section
app.get(Path.user, getAllUsersController)
app.put(Path.userWithId, updateUserController)

//WorkSpace section
app.post(Path.workSpace, createWorkSpaceController)
app.get(Path.workSpaceWithId, getAllWorkSpacesController)
app.delete(Path.workSpaceWithId, deleteWorkSpaceController)
app.put(Path.workSpaceWithId, updateWorkSpaceController)

//Board section
app.post(Path.board, createBoardController)
app.get(Path.boardWithId, getAllBoardsController)
app.delete(Path.boardWithId, deleteBoardController)
app.put(Path.boardWithId, updateBoardController)

//List section
app.post(Path.list, createListController)
app.get(Path.listWithId, getAllListsController)
app.delete(Path.listWithId, deleteListsController)
app.put(Path.listWithId, updateListsController)

//Item section
app.post(Path.item, createItemController)
app.get(Path.itemWithId, getAllItemsController)
app.delete(Path.itemWithId, deleteItemController)
app.put(Path.itemWithId, updateItemController)

//Comment section
app.post(Path.comment, createCommentController)
app.get(Path.commentWithId, getAllCommentsController)
app.delete(Path.commentWithId, deleteCommentController)
app.put(Path.commentWithId, updateCommentController)

//Checklist section
app.post(Path.checklist, createChecklistController)
app.get(Path.checklistWithId, getAllChecklistController)
app.delete(Path.checklistWithId, deleteChecklistController)
app.put(Path.checklistWithId, updateChecklistController)

//CheckItem section
app.post(Path.checkItem, createCheckItemController)
app.get(Path.checkItemWithId, getAllCheckItemsController)
app.delete(Path.checkItemWithId, deleteCheckItemController)
app.put(Path.checkItemWithId, updateCheckItemController)

//Mark section
app.post(Path.mark, createMarkController)
app.get(Path.markWithId, getAllMarksController)
app.delete(Path.markWithId, deleteMarkController)
app.put(Path.markWithId, updateMarkController)



app.listen(port, () => { 
  console.log(`Trello app listening on port ${port}`)
})
app.use(ErrorHandler)