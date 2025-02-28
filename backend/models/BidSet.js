const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const BidSetSchema=new Schema({
    productId:{
        type:String,
        required:true
    },
    bidAmount:{
        type:String,
        required:true
    },
    bidTime:{
        type:String,
        required:true
    },

});

const BidSet=mongoose.model("BidSet",BidSetSchema);
module.exports=BidSet;