import express from 'express';
const app = express()
const port = 3000

//https://dev.to/macmacky/get-better-with-typescript-using-express-3ik6 this is good helper
//app.get<Params,ResBody,ReqBody,ReqQuery,Locals>
//Params - id in url
//ResBody - response json
//ReqBody - request body
//ReqQuery - request query params
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