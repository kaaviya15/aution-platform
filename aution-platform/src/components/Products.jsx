
import { useNavigate } from 'react-router-dom'
import prod from './Data';
const Products = () => {

    const navigator=useNavigate();
    

    function handleBid(id){
        navigator(`/product/${id}`);
    }
    
  return (
    <div className='product-container'>
    
      {
       prod.map((Item)=>{
            return (
                <div key={Item.id} className='product-item'>
                    <div className='item-name'>{Item.name}</div>
                    <img src={Item.image} alt={Item.name} className='product-image'/>
                    
                    <div>StartTime: {Item.startTime}</div>
                    <div>EndTime: {Item.endTime}</div>
                    <div>₹{Item.cost}</div>
                    <button className='button' onClick={()=>handleBid(Item.id)}>Add Bid</button>
                    </div>
            )
        })
      }
    </div>
   
  )
}

export default Products
