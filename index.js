const express = require("express");
const openai = require("openai");
const getData = require('./chatGPT/config');
const port= process.env.POST || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/answer", async (req, res) => {
  console.log(req.body.question)

  sendResponse= async (question, max_tokens)=>{
    const answer = await getData(question, max_tokens);
    res.send(answer);
  };
  sendResponse(req.body.question, req.body.max_tokens);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});
