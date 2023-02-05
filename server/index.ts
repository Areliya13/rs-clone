import express from 'express';
import {connect, model } from 'mongoose';
import { defaultImg } from './src/constants/constants';
import { userSchema } from './src/schema/user';
import { ICheckItem, ICheckList, IUser } from './src/schema/user.types';
import { createNewUser } from './src/utils/createNewUser';
import { IEmptyParams, IEmptyReqQuery } from './types';

const app = express()
const port = 3000

//https://dev.to/macmacky/get-better-with-typescript-using-express-3ik6 this is good helper
//app.get<Params,ResBody,ReqBody,ReqQuery,Locals>
//Params - id in url
//ResBody - response json
//ReqBody - request body
//ReqQuery - request query params


// interface IUser {
//   name: string;
//   email: string;
//   avatar?: string;
//   arr: string[];
// }

// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true  },
//   email: { type: String, required: true },
//   avatar: String,
//   arr: Array<String>
// });

// const User = model<ICheckList>('User', checkListSchema);  //это функция конструктор (класс)
const UserList = model<IUser>('userList', userSchema);  //это функция конструктор (класс)


async function main() {
  await connect('mongodb+srv://admin:v1VBsDSCDlkzGIKR@trello.id2jf8j.mongodb.net/trello?retryWrites=true&w=majority');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  const user = await new UserList();
  // const x = await User.findById('63de444b5a083013f4f85b92'); // read model by id
  // const x = await User.findByIdAndDelete('63de56a045cdfac5c2c2129a'); // read model by id and delete
  // user.save();
  // user.deleteOne({arrayFilters: {name: 'Tamara'}})
  const list = await UserList.findByIdAndUpdate<IUser>('63de5657068eec2fde4246ed', {name: 'dada1', id: undefined, boards: [{title: 'new tamaras board'}]});
  const x = await UserList.find(); // read model all
  console.log(user);  
  return x
}



app.get<
IEmptyParams,
IUser[],
IEmptyReqQuery,
IEmptyReqQuery>
('/rest', async (req, res) => {res.send(await main())})

app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})