import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Component/Component.css'

// eslint-disable-next-line react/prop-types
const LoginSignUp = ({ setIsLoggedIn,setUserRole }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Buyer');
  const [action, setAction] = useState('Login'); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsLoggedIn(true);
    console.log("Select Role:",role);
    if(setUserRole){
    setUserRole(role);
  console.log("setUserRole Called");}
    else{
      console.log("setUserRole is not defined!");
    }
    localStorage.setItem("isLoggedIn","true");
    localStorage.setItem("userRole",role);
    
      navigate('/home');  
    
  };

  return (
    <div className="container">
      <div>
        <div style={{ paddingBottom: '15px', fontSize: '30px' }}>
          <center>{action}</center>
        </div>

        <form onSubmit={handleSubmit}>
          
          {action === 'SignUp' && (
            <div style={{ margin: '15px' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div style={{ margin: '15px' }}>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ margin: '15px' }}>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                height: "35px",
                width: "50%",
                fontSize: "15px",
                padding: "5px",
                border: "1px solid rgb(184, 185, 185)",
                borderRadius: "5px",
                backgroundColor: "white",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

        
          <button type="submit" className="submitButton">
            {action}
          </button>
        </form>

       
        <div>
          <button
            type="button"
            className="submitButton"
            onClick={() => setAction('Login')}
          >
            Switch to Login
          </button>
          <button
            type="button"
            className="submitButton"
            onClick={() => setAction('SignUp')}
          >
            Switch to SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
