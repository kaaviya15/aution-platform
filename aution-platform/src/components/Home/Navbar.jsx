import { Link, useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';

// eslint-disable-next-line react/prop-types
const Navbar = ({ isLoggedIn, userRole, setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [loggedin, setLoggedIn] = useState(isLoggedIn);
  const [role, setRole] = useState(userRole || localStorage.getItem("userRole"));

  useEffect(() => {
    setLoggedIn(isLoggedIn);
    setRole(userRole);
  }, [isLoggedIn, userRole]);

  function handleLogout() {
    setLoggedIn(false);
    setRole("buyer");  // Reset to default
    setIsLoggedIn(false);  // ✅ Update global state
    setUserRole("buyer");  // ✅ Update global role state
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");

    navigate("/login", { replace: true });  // ✅ Redirect immediately
  }

  function handleOnClick(){
    navigate("/Home");
  }

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={handleOnClick}>Ebay</h2>
      <ul className="nav-links">
        {role === "seller" && <li><Link to="/SellProducts">Add Product</Link></li>}
        {role === "seller" ? <li><Link to="/sellerdashboard">Dashboard</Link></li> : <li><Link to="/buyerdashboard">Dashboard</Link></li>}
        <li><Link to="/get_hotSales">Hot Sales</Link></li>
        {loggedin ? (
          <li><button onClick={handleLogout} className="logout">Logout</button></li>
        ) : (
          <li><Link to="/login" className="login-signup">Login/SignUp</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
