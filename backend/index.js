require("dotenv").config();

const express = require("express");
const connectDB=require('./config/db');
const userRoutes=require('./routes/userRoutes');



const app = express();
app.use(express.json());


//connect to mongoDB
connectDB();

//Routes
app.use('/api/user',userRoutes);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
