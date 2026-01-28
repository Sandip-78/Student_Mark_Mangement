const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/',(req,res)=>{
    res.send('hii from backend');
})

app.use('/users',userRoutes);

module.exports = app;