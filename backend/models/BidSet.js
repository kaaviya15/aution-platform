const mongoose=require('mongoose');


const BidSetSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        required:true
    },
    bidder:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true
    },
    bidAmount:{
        type:Number,
        required:true
    },
    bidTime:{
        type:Date,
        default:Date.now
    },

});

const BidSet=mongoose.model("BidSet",BidSetSchema);
module.exports=BidSet;