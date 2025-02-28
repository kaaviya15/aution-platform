const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const product_modelSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:Image,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    start_time:{
        type:time,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    current_highest_bid:{
        type:Number,
        required:true
    }
});

const Product=mongoose.model("Product",product_modelSche);
module.exports=Product;