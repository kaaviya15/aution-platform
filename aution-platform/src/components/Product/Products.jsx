
import { useNavigate } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios';
import AuctionTimer from './AuctionTimer';

const Products = () => {
    
   const[products,setProducts]=useState([]); 

    const API_BASE_URL=import.meta.env.VITE_API_URL;
    const navigator=useNavigate();
    

    function handleBid(id){
      // const now=new Date();
      // const end=new Date(end_time);
      // if(now>=end){
      //   alert("Bidding has ended for this project");
      // }
        navigator(`/product/${id}`);
    }
    
       const endpoint="/api/user/getProducts";

     useEffect( ()=>{
      const fetchProducts=async()=>{
        const response= await axios.get(`${API_BASE_URL}${endpoint}`);
         setProducts(response.data);         
        
      };
      fetchProducts();
     },[])

     console.log(products);

     function isDisabled(end_time){
      return new Date()>=new Date(end_time);
     }

  return (
    <div className='product-container'>
    
      {
       products.map((Item)=>{
            return (
              
                <div key={Item._id} className='product-item'>
                    <div className='item-name'>{Item.name.toUpperCase()}</div>
                    
                    <img src={`http://localhost:5000/${Item.image}`} alt={Item.name} className='product-image'/>
                    <div className='item-date'>{new Date(Item.start_time).toLocaleDateString()}</div>
                    <AuctionTimer 
            startTime={Item.start_time} 
            endTime={Item.end_time} 
          />
                    <div>₹{Item.cost}</div>
                    <button className='button' disabled={isDisabled(Item.end_time)} onClick={()=>handleBid(Item._id)}>Add Bid</button>
                    </div>
                 
            )
        })
      }
    </div>
   
  )
}

export default Products
