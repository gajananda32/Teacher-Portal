const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config()

const app = express();
app.use(bodyParser.json())
app.use(express.json({limit:'200mb'}))
app.use(express.urlencoded({limit:'200mb',extended:true}))
app.use(cors());

let indexRoute = require('./Routes/index')

app.use("/api",indexRoute)

const port = process.env.PORT

let dbstr = process.env.MONGO_HOST

mongoose.connect(dbstr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((error) => {
    console.log("🚀 ~ mongoose.connect ~ error:", error);
  });


app.listen(port,()=>{
    console.log("Listining to port: ",port)
})