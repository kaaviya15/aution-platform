import { useNavigate } from 'react-router-dom';
import './SellProducts.css'

const SellProducts = () => {

  const navigate=useNavigate();
    function handleForm(e){
      e.preventDefault();
      
        navigate("/paymentDetails");
     }
    
  return (
    <div className='container-color'>
       
    <div className='addproduct-container'>
        <div className='header'><header>Add Product</header></div>
      <form onSubmit={handleForm} className="product">
          <div className='productdetails'>
            
            <input type="text" placeholder='Enter Product Name' required></input>
          </div>
          <div className='productdetails'>
           
            <input type="text" placeholder='Enter Product Description' required></input>
          </div>
          <div className='productdetails'>
            
            <input type="file" accept="image/*" placeholder='Enter Product Image' required></input>
          </div>
          <div className='productdetails'>
            <label></label>
            <input type="text" placeholder='Enter Product Cost' required ></input>
          </div>
          <div className='productdetails'>
            
            <input type="datetime-local" placeholder='Enter StartTime' required></input>
          </div>
          <div className='productdetails'>
            
            <input type="datetime-local" placeholder='Enter EndTime' required></input>
          </div>
          <button  type="submit" className='submitProduct'>Next</button>
      </form>
    </div>
    </div>
  )
}

export default SellProducts
