import axios from 'axios'
import {useState,useEffect} from 'react'
import AuctionTimer from '../Product/AuctionTimer';
const HotSales = () => {

      const[hotSale,sethotSale]=useState([]);
     const API_BASE_URL=import.meta.env.VITE_API_URL;
     const endpoint="/api/user/get_hotSales";
    
     useEffect(() => {
        const fetchHotSales = async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}${endpoint}`);
            sethotSale(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching hot sales:", error);
          }
        };
      
        fetchHotSales();
      }, []);
      
      function handleBid(id){
        navigator(`/product/${id}`);
    }
  return (
    <div>
          {
            hotSale.map((Item)=>{
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
                        <button className='button' onClick={()=>handleBid(Item._id)}>Add Bid</button>
                        </div>
                )
            })
          }
    </div>
  )
};

export default HotSales
