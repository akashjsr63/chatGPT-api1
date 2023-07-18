const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const conn_string = process.env.CONN_STRING;

    mongoose.connect(conn_string , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, 
     }).then(()=>{
      console.log('connected to database!!')
     }).catch((e)=>{
      console.log(`No connection ${e}`)
     });
     