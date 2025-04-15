const Product=require('../models/Products')


const hotsaleProduct=async (req,res)=>{


const now=new Date();
try {
    const hotsale = await Product.find({
      $and: [
        { start_time: { $lte: now } },
        { end_time: { $gte: now } },
        {
          $expr: {
            $lte: [
              {
                $divide: [
                  { $subtract: ["$end_time", "$start_time"] },
                  60000, 
                ],
              },
              60,
            ],
          },
        },
      ],
    });

    res.json(hotsale);
  }catch(err){
        res.status(500).json({
        message:"Internal error",
        error:err.message,
        });
    }

}

module.exports={hotsaleProduct};