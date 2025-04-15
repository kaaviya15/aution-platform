
import { useParams } from "react-router-dom"
import {useEffect,useState} from 'react'
import './ProductDetails.css'
import axios from "axios"
import AuctionTimer from "../Product/AuctionTimer"
import io from "socket.io-client";
const socket=io(import.meta.env.VITE_API_URL);



const ProductDetails = () => {
    const {id} =useParams();
    const[productById,setProdById]=useState(null);
    const [bidAmount,setBidAmount]=useState("");
    const[bids,setBids]=useState([]);



    const API_BASE_URL=import.meta.env.VITE_API_URL;
    


     const endpoint=`/api/user/getById/${id}`;
     useEffect(()=>{
          const fetchById=async()=>{
            
            const prodById=await axios.get(`${API_BASE_URL}${endpoint}`);
             setProdById(prodById.data);
          }

          fetchById();
     },[]);


     useEffect(()=>{
      const fetchBids=async()=>{
        const response=await axios.get(`${API_BASE_URL}/api/user/getAllBids/${id}`);
        setBids(response.data);
      }
      fetchBids();
     },[]);



     useEffect(()=>{
      if(productById){
        socket.emit("joinRoom",productById._id);

        socket.on("newBid",({bid})=>{
          console.log(bid);
          bid.bidTime=new Date(bid.bidTime);
          setBids((prev)=>[bid,...prev]);
        });
        
        socket.on('bidReject',({message})=>{
          alert(message);
        });

        socket.on('bidRejected',({message})=>{
          alert(message);
        });
        return ()=>{
          socket.off("newBid");
        };
      }
     },[productById]);


     const handleAddBid=()=>{

      const userId=localStorage.getItem("userId");
      console.log(userId);
      if(!userId||!bidAmount) return alert("Please login and enter a bid.");

      socket.emit("placeBid",{
        productId: productById._id,
        userId:userId,
        amount:Number(bidAmount),

      });
      setBidAmount("");
     }
    console.log(bids);
if(!productById){
  return <div>Loading....</div>
}
  return (
    <>
    <div className="prod-container">
    <div className="product-image">
      <img src={`http://localhost:5000/${productById.image}`} className="pro-image"></img>
    </div>
    <div className="product-detail">
     <div className="product-name">{productById.name}</div>
     <div className="product-description">{productById.description}</div>
     <div className="product-Starttime">StartDate: {new Date(productById.start_time).toLocaleDateString()}</div>
     <div className="product-Starttime">EndDate: {new Date(productById.end_time).toLocaleDateString()}</div>
     <div className="product-Starttime">Time: {<AuctionTimer startTime={productById.start_time} endTime={productById.end_time}/>}</div>
     
     <div className="product-cost">₹{productById.cost}</div>
     <div className="bid-details">
    <input 
    className="bid-input" 
    type="text" 
    placeholder="Add bid"
    value={bidAmount}
    onChange={(e)=>setBidAmount(e.target.value)} />
    <button className="bid-btn" onClick={handleAddBid}>Add bid</button>
</div>
     
    </div>
    
    </div>
    <h4>Live Bids</h4>
    {bids.length === 0?(
      <p>No bids yet</p>
    ):(
      <ul style={{listStyleType:"none"}}>{
        bids.map((bid,i)=>(
          <li key={i}>
            ₹{bid.bidAmount} - {new Date(bid.bidTime).toLocaleString()}
            
          </li>
        ))
      }</ul>
    )}
    </>
  )
}

export default ProductDetails
