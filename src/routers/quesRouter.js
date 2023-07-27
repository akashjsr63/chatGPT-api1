const express = require('express');
const getData = require('../chatGPT/config');
const router = express.Router();
const path = require('path');
const QuesModel = require('../models/quesModel');
const hbs = require('hbs')
router.use(express.static(path.resolve('./public')));

const fetchAnswer = async (_id, quesHtml) => {
  const system = "Act as a experienced prompt engineer and find the answer of to the question in the HTML text. And in For coding questions, / code snippet provided use C++ to solve the problem. For MCQ questions, give the correct option.";
  try{
     var chatGPTResponse = await getData(quesHtml, system, 1024);
     var data = await QuesModel.findById(_id);
     data.chatGPTResponse = chatGPTResponse;
     await data.save();
     return data;
     
  }catch(error){
    console.log(error)
  }
};

router.post('/uploadQues', async (req, res) => {
    try {
      const { siteName, siteUrl, quesHtml, timestamp } = req.body;

      const newData = new QuesModel({
        siteName,
        siteUrl,
        quesHtml,
        timestamp,
        chatGPTResponse:"Fetching answer...",
      });

      const savedData = await newData.save();
      res.status(200).json({ message: 'Data uploaded successfully'});

      setTimeout(async () => { 
       try {
         await fetchAnswer(savedData._id, savedData.quesHtml);
       } catch (error) {
         console.error('Error in background task:', error);
       }
       }, 0);

    } catch (error) {
      console.error('Error while uploading data:', error);
      res.status(500).json(error);
    }
  });

  router.get("/ques", async (req, res)=>{
    try{
      const page = parseInt(req.query.page) || 1; 
      const itemsPerPage = parseInt(req.query.limit) || 25;
  
      const count = await QuesModel.countDocuments(); 
      const totalPages = Math.ceil(count / itemsPerPage);
      const skip = (page - 1) * itemsPerPage;
  
      const latestData = await QuesModel.find()
        .sort({_id: -1})
        .skip(skip)
        .limit(itemsPerPage)
        .select('siteName siteUrl _id timestamp');
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    if(pageNumbers.length>5) pageNumbers.length=5; 
  
    const pagination = {
      current: parseInt(page),
      totalPages
    };
  
    res.render('index', { data: latestData, pagination, pageNumbers});
    }catch(error){
      res.send(error.message);
    }
  })

  router.get("/ques/:id", async (req, res)=>{
    try{
      const _id = req.params.id;
      const data = await QuesModel.findById(_id);

      var response= data.chatGPTResponse;
      if(response != undefined || response != undefined){
        response= response.replace(/\n/g, '<br>');
      }

      const html = `<h2 style="margin-top: 40px; text-align:center; color: blue;">Question </h2>
                  <div style="margin: 3vw; font-size: 16px; line-height: 1.6;">
                  Behaving as a subject matter expert you should directly Provide a concise and precise answer to the following question without any explaination  to the question and if code snippet s provided solve the question in cpp. the question is : 
                  <br>
                   ${data.quesHtml}
                   <br>
                   <h2 style="color: blue;">CHAT GPT Answer</h2>
                   <br>
                   <div style="font-weight: bold;">
                   ${response}
                   </div>
                  </div>`;
      res.send(html);

    }catch(error){
      res.send(error.message);
    }
  })


  module.exports = router;