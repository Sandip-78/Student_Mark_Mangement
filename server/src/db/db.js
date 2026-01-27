const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database connection successfully");
    })
    .catch((err)=>{
        console.log("Database connection Error : ", err);
    })
}

module.exports = connectDB;