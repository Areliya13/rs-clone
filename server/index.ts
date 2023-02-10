import express from 'express';
import cors from 'cors';
import { port as expressPort } from './src/config';
import { Path } from './src/types/path';
import { createWorkSpaceController, deleteWorkSpaceController, getAllWorkSpacesController, updateWorkSpaceController } from './src/controllers/workSpace/index';
import { getAllUsersController } from './src/controllers/user/index';
import { createBoardController, deleteBoardController, getAllBoardsController } from './src/controllers/board/index';

const app = express()
const port = expressPort || 3000
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//User section
app.get(Path.user, getAllUsersController)

//WorkSpace section
app.post(Path.workSpace, createWorkSpaceController)
app.get(Path.workSpaceWithId, getAllWorkSpacesController)
app.delete(Path.workSpaceWithId, deleteWorkSpaceController)
app.put(Path.workSpaceWithId, updateWorkSpaceController)

//Board section
app.post(Path.board, createBoardController)
app.get(Path.boardWithId, getAllBoardsController)
app.delete(Path.boardWithId, deleteBoardController)
// app.put(Path.boardWithId, updateBoardController)

// // List section
// app.post(Path.list, createListController)
// app.get(Path.list, getAllListsController)
// app.delete(Path.listWithId, deleteListsController)

// async function main() {
//   await connectToDB()
//   const user = await User.create<IUser>({
//     _id: createId(),
//     name: 'Виктор Цой',
//     workSpace: [],
//   })

//   // const item = await ItemsList.create({
//   //   name: 'item1',
//   //   comments: [comment._id]
//   // })

//   // const list = await ListsList.create({
//   //   name: 'list1',
//   //   items: [item._id]
//   // })

//   // const board = await BoardersList.create({
//   //   name: 'boarder1',
//   //   lists: [list._id]
//   // })
  
//   console.log(user)
// }
// main();

// async function populates () {
//   console.log('sadsadas')
//   await connectToDB()
//     const article = await ListsList.find({})
//     .populate({path: "boardId"})
//     console.log(article)
// }
// populates()

// async function test() {
//   await connectToDB()
//   const Board = model('Board', boardSchema);
//   const List = model('List', listSchema);
//   const Item = model('Item', itemSchema);
//   const Comment = model('Comment', commentSchema);
//   const article = await Board.findOne({ _id: '63e54befeed9ef2738ce1e2d'})
//   .populate({path: 'lists', 
//     populate: {path: 'items', 
//       populate: {path: 'comments'}
//     }
//   })
//   return article
// }


// app.get('/:id', async (req, res) => {
//   const id = req.params.id
//   await connectToDB()
//   const List = model('List', listSchema);
//   const list = await List.findById(id)
//   await list?.updateOne({$pull: {items: '63e54befeed9ef2738ce1e29'}})
//   // const response = await test()
//   // res.status(200).send(response)
// })

app.listen(port, () => { 
  console.log(`Trello app listening on port ${port}`)
})
