const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/',(req,res)=>{
    res.send('hii from backend');
})

module.exports = app;