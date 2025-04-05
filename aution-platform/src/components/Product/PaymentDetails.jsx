

const PaymentDetails = () => {
    function handleForm(){

    }
  return (
    <div>
      <div className='container-color'>
       
       <div className='addproduct-container'>
           <div className='header'><header>Payment Details</header></div>
         <form onClick={handleForm} className="product">
             <div className='productdetails'>
               
               <input type="text" placeholder='Enter Phone Number' required></input>
             </div>
             <div className='productdetails'>
              
               <input type="text" placeholder='Enter Bank Name' required></input>
             </div>
             <div className='productdetails'>
               
               <input type="text"  placeholder='Enter Bank Branch' required></input>
             </div>
             <div className='productdetails'>
               <label></label>
               <input type="text" placeholder='Enter Account Number' required ></input>
             </div>
             
             <button className='submitProduct'>submit</button>
         </form>
       </div>
       </div>
    </div>
  )
}

export default PaymentDetails
