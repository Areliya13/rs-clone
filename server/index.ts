import express from 'express';
import { port as expressPort } from './src/config';
import { createBoardController, deleteBoardController, getAllBoardsController } from './src/controllers/board/index';
import { Path } from './src/types/path';

const app = express()
const port = expressPort || 3000
app.use(express.json());
app.use(express.urlencoded({extended: false}))
//https://dev.to/macmacky/get-better-with-typescript-using-express-3ik6 this is good helper
//app.get<Params,ResBody,ReqBody,ReqQuery,Locals>
//Params - id in url
//ResBody - response json
//ReqBody - request body
//ReqQuery - request query params


// const UserList = model<IUser>(nameDB, userSchema);  //это функция конструктор (класс)

// async function main(id: string) {
//     await connect(urlDB);
//     // const x = await User.findById('63de444b5a083013f4f85b92'); // read model by id
//     // const x = await User.findByIdAndDelete('63de56a045cdfac5c2c2129a'); // read model by id and delete
//     // user.save();
//     // user.deleteOne({arrayFilters: {name: 'Tamara'}})
//     // const list = await UserList.findByIdAndUpdate<IUser>(id, {name: 'dada1', id: undefined, boards: [{title: 'new tamaras board'}]});
//     const x = await UserList.findById(id); // read model all
//     return x
    
// }
// Board section
app.post(Path.board, createBoardController)
app.get(Path.boardWithId, getAllBoardsController)
app.delete(Path.boardWithId, deleteBoardController)

app.listen(port, () => { 
  console.log(`Trello app listening on port ${port}`)
})