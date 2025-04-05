import { useEffect, useState } from "react"

import './SellerDashBoard.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerDashBoard = () => {
   
    const navigate=useNavigate();

    const[products,setProducts]=useState([]);
    // const[Loading,setLoading]=useState(true);
   const API_BASE_URL=import.meta.env.VITE_API_URL;
   const endpoint="/api/user/getProducts";
    useEffect(()=>{
        const fetchProduct= async()=>{
           const response=await axios.get(`${API_BASE_URL}${endpoint}`);
           const products=response.data;
           setProducts(products);
        };
        fetchProduct();
    },[]);


    
    const removeProduct=async(id)=>{
        try{
        const removeEndpoint=`/api/user/deleteById/${id}`;
     await axios.delete(`${API_BASE_URL}${removeEndpoint}`);
        
    setProducts((prev)=>prev.filter(p=>p._id!==id));
    }catch(err){
            console.error("Error deleting",err);
        }

    };

 

  return (
    <div className="dashboard">
        <div>
            {products.length===0?<p>Product Not Found</p>:
            <table>
                
                <tbody>
                    {
                       products.map((product)=>{
                         return  <tr key={product._id} className="prod-row">
                         
                            <td>{product.name}</td>
                            <td>{new Date(product.start_time).toLocaleTimeString()} - {new Date(product.start_time).toLocaleDateString()}</td>
                            <td>{new Date(product.end_time).toLocaleTimeString()} - {new Date(product.end_time).toLocaleDateString()}</td>
                            <td>{product.cost}</td>
                            <td>{new Date(product.end_time) < new Date() ? "TimeOut" : "Available"}</td>
                            <button onClick={()=>navigate(`/sellproducts/${product._id}`)}>update</button>
                            <button onClick={()=>removeProduct(product._id)}>remove</button>
                      </tr>
                        
                       })
                    }
                 
                </tbody>

            </table>
            }
        </div>
      
    </div>
  )
}

export default SellerDashBoard
