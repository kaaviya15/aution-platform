import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Component/component.css";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const LoginSignUp = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Lowercase for consistency
  const [action, setAction] = useState("Login");

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Persistent Login State
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserRole = localStorage.getItem("userRole")?.toLowerCase();

    console.log("Stored Values on Load -> isLoggedIn:", storedIsLoggedIn, "userRole:", storedUserRole);

    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);

      if (storedUserRole === "seller") {
        navigate("/sellproducts");
      } else {
        navigate("/home");
      }
    }
  }, []);
  console.log("API Base URL:", API_BASE_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      action === "SignUp" ? "/api/user/register" : "/api/user/login";

    const userData = {
      email,
      password,
      role: role.toLowerCase(), // Lowercase for consistency
    };
    console.log("Login Request Data:", userData);

    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, userData);

      if (response.status === 200 || response.status === 201) {
        alert(response.data.message);

        const userRoleFromResponse =
          response.data.user?.roles?.[0]?.toLowerCase() || role.toLowerCase();

        setIsLoggedIn(true);
        setUserRole(userRoleFromResponse);

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", userRoleFromResponse);

        console.log(
          "Stored isLoggedIn:",
          localStorage.getItem("isLoggedIn")
        );
        console.log("Stored userRole:", localStorage.getItem("userRole"));

        if (userRoleFromResponse === "seller") {
          navigate("/sellproducts");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data?.message || "An error occurred"
      );
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container">
      <div>
        <div style={{ paddingBottom: "15px", fontSize: "30px" }}>
          <center>{action}</center>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ margin: "15px" }}>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ margin: "15px" }}>
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
              onChange={(e) => setRole(e.target.value.toLowerCase())} // Ensures lowercase consistency
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
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
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
            onClick={() => setAction("Login")}
          >
            Switch to Login
          </button>
          <button
            type="button"
            className="submitButton"
            onClick={() => setAction("SignUp")}
          >
            Switch to SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
