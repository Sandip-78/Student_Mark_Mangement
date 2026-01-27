const http = require('http');
const app = require('./src/app');
const PORT = process.env.PORT || 4000;
const connectDB = require('./src/db/db');
const server = http.createServer(app);

connectDB();

server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})

