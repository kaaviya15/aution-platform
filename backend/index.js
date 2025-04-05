require('dotenv').config();

const express = require("express");
const connectDB = require('./config/db');

const userRoutes=require('./routes/userRoutes');
const cors=require('cors');
const fileUpload=require("express-fileupload");

const app = express();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));



app.use(fileUpload());
app.use('/uploads',express.static('uploads'));
//connect to mongoDB
connectDB();

//Routes
app.use('/api/user',userRoutes);
// app.use('/api/addProducts',addProducts);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
