import { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navbar = ({ isLoggedIn,userRole}) => {
    const navigate = useNavigate();
    const[loggedin,setLoggedIn]=useState(isLoggedIn);
    const[role,setRole] =useState(userRole||localStorage.getItem("userRole"));
  
  useEffect(()=>{
    setLoggedIn(isLoggedIn);
    setRole(userRole);
  },[isLoggedIn,userRole]);

  
    function handleLogout() {
    setLoggedIn(false);
    setRole("Buyer");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");  
  }
  return (
    <div>
    <nav className="navbar">
        <h2 className="logo">Ebay</h2>
        <ul className="nav-links">
           {role === "Seller" &&<li><Link to="/SellProducts">Add Product</Link></li>}
          <li><Link to="/hotsales">HotSales</Link></li>
          {loggedin ? (
            <li><button onClick={handleLogout} className="logout">Logout</button></li>
          ) : (
            <li><Link to="/login" className="login-signup">Login/SignUp</Link></li>
          )}
        </ul>
      </nav>
      </div>
  )
}

export default Navbar
