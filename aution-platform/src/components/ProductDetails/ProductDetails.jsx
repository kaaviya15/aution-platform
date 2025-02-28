import prod from "../Data"
import { useParams } from "react-router-dom"
import './ProductDetails.css'


const ProductDetails = () => {
    const {id} =useParams();
    const product=prod.find((item)=>item.id===parseInt(id));
  return (
    <>
    <div className="prod-container">
    <div className="product-image">
      <img src={product.image} className="pro-image"></img>
    </div>
    <div className="product-detail">
     <div className="product-name">{product.name}</div>
     <div className="product description">{product.description}</div>
     <div className="product-Starttime">StartTime: {product.startTime}</div>
     <div className="product-Endtime">EndTime: {product.endTime}</div>
     <div className="product-cost">₹{product.cost}</div>
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
