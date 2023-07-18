const express = require('express');
const getData = require('../chatGPT/config');
const router = express.Router();
const path = require('path');
const QuesModel = require('../models/quesModel');
const hbs = require('hbs')
router.use(express.static(path.resolve('./public')));

router.post('/uploadQues', async (req, res) => {
    try {
      const { siteName, siteUrl, quesHtml, timestamp } = req.body;
      const system = "There is a question or problem statement in the given text. Find it and give its answer. If it is a coding question use c++.";
      var chatGPTResponse = await getData(quesHtml, system, 1000);

      const newData = new QuesModel({
        siteName,
        siteUrl,
        quesHtml,
        timestamp,
        chatGPTResponse,
      });

      await newData.save();
      res.status(200).json({ message: 'Data uploaded successfully' });
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

      var response= data.chatGPTResponse.replace(/\n/g, '<br>');

      const html = `<h2 style="margin-top: 40px; text-align:center; color: blue;">Question </h2>
                  <div style="margin: 3vw; font-size: 16px; line-height: 1.6;">
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