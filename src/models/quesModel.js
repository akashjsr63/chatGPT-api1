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

const databaseName = process.env.DATABASE_NAME || ques1;
module.exports = new mongoose.model(databaseName, quesSchema);
