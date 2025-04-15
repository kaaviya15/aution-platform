const BidSet=require('../models/BidSet');
const Product=require('../models/Products');

const biddingSocketHandler=(io)=>{

    io.on('connection',(socket)=>{
        console.log("new client connected",socket.id);

        socket.on('joinRoom',(productId)=>{
            socket.join(productId);
            console.log(`client ${socket.id} joined room: ${productId}`);
        });

        socket.on('placeBid',async({productId,userId,amount})=>{
            try{
                const product=await Product.findById(productId);
                const now=new Date();
                if(now<product.start_time || now>product.end_time){
                    socket.emit('bidRejected',{message:'Auction not active'});
                    return;
                }
                
                if(product.seller.toString() === userId.toString()){
                    socket.emit('bidReject',{message:'Seller cannot bit on the product'});
                    return;
                }


               const existingBid=await BidSet.findOne({product:productId,bidder:userId});

               if(existingBid){
                socket.emit('bidRejected',{message:'You have already placed the bid'});
                return;
               }

                const bid=await BidSet.create({product:productId,bidder:userId,bidAmount:amount});

                const plainBid=bid.toObject();

                io.to(productId).emit('newBid',{
                    bid:{
                        _id:plainBid._id,
                        bidAmount:plainBid.bidAmount,
                        bidder:plainBid.userId,
                        bidTime:plainBid.bidTime.toISOString()                    }
                });
            }
            catch(err){
                console.error("Error placing bid: ",err.message);
                socket.emit('bidError',{message:'Something went wrong'});
            }
        });
        socket.on('disconnect',()=>{
            console.log("Client disconnected",socket.id);
        });
    });
};

module.exports=biddingSocketHandler;