import express from 'express';
import mongoose, {connect, Schema, model, isValidObjectId, modelNames } from 'mongoose';

const app = express()
const port = 3000

//https://dev.to/macmacky/get-better-with-typescript-using-express-3ik6 this is good helper
//app.get<Params,ResBody,ReqBody,ReqQuery,Locals>
//Params - id in url
//ResBody - response json
//ReqBody - request body
//ReqQuery - request query params


interface IUser {
  name: string;
  email: string;
  avatar?: string;
  arr: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true  },
  email: { type: String, required: true },
  avatar: String,
  arr: Array<String>
});

const User = model<IUser>('User', userSchema);  //это функция конструктор (класс)

main().catch(err => console.log(err));
async function main() {
  await connect('mongodb+srv://admin:v1VBsDSCDlkzGIKR@trello.id2jf8j.mongodb.net/trello?retryWrites=true&w=majority');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  const user = new User({
    name: 'Bill22',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png',
    arr: ['s', 'd']
  });
  const x = await User.findById('63dc0e424d7c4ebacb50393c');

  console.log(user.email, x);
  
}

async function zz() {
  const d = await isValidObjectId('63dsfe716068f134993f3117s')
  const z = await modelNames()
  console.log('d', d, z);
}
  zz()


app.get<
{},
{ data: string[], message: string },
{},
{ page: number, limit: number, breed: 'labrador' | 'german shepherd' | 'golden retriever' }>
('/', (req, res) => {
  res.send({data: ['доска не доска. лист не лист'], message: 'Start?'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})