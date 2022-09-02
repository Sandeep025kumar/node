const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./router/router');
const cookieParser = require('cookie-parser')
const {PORT,DB} = process.env;
mongoose.connect(DB).then(()=>{
    console.log("DB Connected Successfully..");
}).catch((err)=>{
    console.log("Db is not connected",err);
})
app.use(express.json())
app.use(cookieParser())
app.use('/api',router)
  app.listen(PORT,()=>{
    console.log("server is running on port :",PORT);
  })