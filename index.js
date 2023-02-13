const express = require("express");
const openai = require("openai");
const getData = require('./chatGPT/config');
const port= process.env.POST || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
  res.send('Send a post request at https://bronze-piranha-coat.cyclic.app/answer')
})

app.post("/answer", async (req, res) => {
  
  sendResponse= async (question, max_tokens)=>{
    const answer = await getData(question, max_tokens);
    res.send(answer);
  };
  sendResponse(req.body.question, req.body.max_tokens);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});
