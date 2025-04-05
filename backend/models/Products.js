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
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    start_time:{
        type:Date,
        required:true
    },
    end_time:{
        type:Date,
        required:true
    },
    
});

const Product=mongoose.model("Product",product_modelSchema);
module.exports=Product;