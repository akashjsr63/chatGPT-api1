const mongoose = require('mongoose');

const quesSchema = mongoose.Schema({
    siteName:{
        type: String
    },
    siteUrl:{
        type: String
    },
    quesHtml:{
        type: String
    },
    chatGPTResponse:{
        type: String
    },
    timestamp:{
        type: String
    }
})

module.exports = new mongoose.model('ques1', quesSchema);
