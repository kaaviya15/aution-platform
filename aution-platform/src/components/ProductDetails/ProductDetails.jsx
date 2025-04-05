
import { useParams } from "react-router-dom"
import {useEffect,useState} from 'react'
import './ProductDetails.css'
import axios from "axios"
import AuctionTimer from "../Product/AuctionTimer"

const ProductDetails = () => {
    const {id} =useParams();
    const[productById,setProdById]=useState(null);
   
    const API_BASE_URL=import.meta.env.VITE_API_URL;
     const endpoint=`/api/user/getById/${id}`;
     useEffect(()=>{
          const fetchById=async()=>{
            
            const prodById=await axios.get(`${API_BASE_URL}${endpoint}`);
             setProdById(prodById.data);
          }

          fetchById();
     },[])

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
    <input className="bid-input" type="text" placeholder="Add bid" />
    <button className="bid-btn">Add bid</button>
</div>
     <button className="bids-detail">Bid Details</button>
    </div>
    
    </div>
    </>
  )
}

export default ProductDetails
