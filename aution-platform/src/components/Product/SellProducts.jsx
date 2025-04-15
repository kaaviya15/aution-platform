import {  useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import './SellProducts.css'
import axios from 'axios';

const SellProducts = () => {


  const{id}=useParams();
  const navigate=useNavigate();
  const API_BASE_URL=import.meta.env.VITE_API_URL;

   const[formData,setFormData]=useState({
    name:"",
    description:"",
    cost:"",
    start_time:"",
    end_time:""
   });


   
   const[image,setImage]=useState(null);
   
   useEffect(()=>{
    if(id){
      axios.get(`${API_BASE_URL}/api/user/getById/${id}`)
      .then((res)=> {
      
        const product = res.data;
        const formattedStart = product.start_time?.slice(0, 16);
        const formattedEnd = product.end_time?.slice(0, 16);
        
        setFormData({
          ...product,
          start_time: formattedStart,
          end_time: formattedEnd
        });

    })
      .catch((err)=>{console.error("Error fetching",err)});
    }
   },[id]);

    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleFileChange=(e)=>{
      setImage(e.target.files[0]);
    }

    const handleForm = async (e)=>{
      e.preventDefault();

      const token = localStorage.getItem("token");
     console.log(token);
      const Data=new FormData();
      Data.append("name",formData.name);
      Data.append("description",formData.description);
      Data.append("image",image);
      Data.append("cost",Number(formData.cost));
      Data.append("start_time",formData.start_time);
      Data.append("end_time",formData.end_time);

      const endpoint="/api/user/addProduct";
      
      try{
        
        if(id){
          await axios.put(`${API_BASE_URL}/api/user/updateById/${id}`,Data,{
            headers:{
              Authorization:`Bearer ${token}`,
              "Content-Type":"multipart/form-data"}
          });
        }

else{

        const response =await axios.post(`${API_BASE_URL}${endpoint}`,Data,{
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type":"multipart/form-data"}
        });
        console.log(response.data);
      }
      }catch(err){
           console.log(err);
      }
      
      
        navigate("/Home");
     };


     
    
  return (
    <div className='container-color'>
       
    <div className='addproduct-container'>
        <div className='header'><header>{id?"Update Product": "Add Product"}</header></div>
      <form onSubmit={handleForm} className="product">
          <div className='productdetails'>
            
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter Product Name' required></input>
          </div>
          <div className='productdetails'>
           
            <input type="text" name="description" value={formData.description} onChange={handleChange}  placeholder='Enter Product Description' required></input>
          </div>
          <div className='productdetails'>
            
            <input type="file" name="image"  onChange={handleFileChange} accept="image/*"  required></input>
          </div>
          <div className='productdetails'>
            <label></label>
            <input type="number" name="cost" value={formData.cost} onChange={handleChange} placeholder='Enter Product Cost' required ></input>
          </div>
          <div className='productdetails'>
            
            <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} placeholder='Enter StartTime' required></input>
          </div>
          <div className='productdetails'>
            
            <input type="datetime-local" value={formData.end_time} name="end_time" onChange={handleChange} placeholder='Enter EndTime' required></input>
          </div>
          <button  type="submit" className='submitProduct'>{id?'Update':'Add'}Submit</button>
      </form>
    </div>
    </div>
  )
}

export default SellProducts
