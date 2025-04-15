const BidSet=require('../models/BidSet');

const bidSet=async(req,res)=>{

    const {id}=req.params;
    try{
          
        
        const bids=await BidSet.find({product:id}).sort({bidAmount:-1});

        if(!bids|| bids.length === 0){
            return res.status(404).json({message:"No bids found"});
        }
        res.status(200).json(bids);
          
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};

module.exports={bidSet};