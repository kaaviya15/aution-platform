require('dotenv').config();

const express = require("express");
const connectDB = require('./config/db');

const userRoutes=require('./routes/userRoutes');
const cors=require('cors');
const http=require('http');
const {Server}=require('socket.io');
const fileUpload=require("express-fileupload");


const biddingSocketHandler=require('../backend/sockets/biddingSocket');


const app = express();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));

const server=http.createServer(app);


const io=new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
});

biddingSocketHandler(io);

app.use(fileUpload());
app.use('/uploads',express.static('uploads'));
//connect to mongoDB
connectDB();

//Routes
app.use('/api/user',userRoutes);
// app.use('/api/addProducts',addProducts);



server.listen(5000, () => {
  console.log("Server running on port 5000");
});
