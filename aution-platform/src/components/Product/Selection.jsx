import { useNavigate } from "react-router-dom"
import selectionbg from "../assets/selectionbg.png"


const Selection = () => {
    const navigator=useNavigate();

    
    function handleSeller(){
        navigator("/sellproducts");
    }
    function handleBuyer(){
      navigator("/Home")
    }
  return (
    <div>
     
    <div style={{
        backgroundImage:`url(${selectionbg})`,
        backgroundSize:"cover",
       backgroundPosition:"center",
       backgroundRepeat:"no-repeat",
       height:"97vh",
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       flexDirection:"column"
        }}>
      <button  style={{
        margin:"30px",
        border:"black 1px solid",
        padding:"20px",
        height:"100px",
        width:"150px",
        fontSize:"20px",
        borderRadius:"10px",
        backgroundColor:"white",
        cursor:"pointer",
        
        }} onClick={handleBuyer}>Buyer</button>
      <button style={{
        margin:"30px",
        border:"black 1px solid",
        padding:"20px",
        height:"100px",
        width:"150px",
        fontSize:"20px",
        borderRadius:"10px",
        backgroundColor:"white",
        cursor:"pointer"
        }} onClick={handleSeller}>Seller</button>
    </div>
    </div>
  )
}

export default Selection
