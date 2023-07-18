const openai = require("openai");
const getData = require('./chatGPT/config');
const express = require('express');
const app = express();
require('dotenv').config();
require('./db/conn')
const helpers = require('./helper/helper');
const path = require('path');
const port= process.env.PORT || 3000;
const dataRoute = require('./routers/quesRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./public')));
app.set('view engine', 'hbs');
app.use(express.json());

app.use('/api', dataRoute);

app.get('/', (req,res)=>{
  res.send('Send a post request at https://bronze-piranha-coat.cyclic.app/answer')
})

app.post("/answer", async (req, res) => {
  system = "Answer the question formated as HTML.";
  try{
    const response = await getData(req.body.question, system, req.body.max_tokens);
    res.send(response);
  }catch(error){
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});
