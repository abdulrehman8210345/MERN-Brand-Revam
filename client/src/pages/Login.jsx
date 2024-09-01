import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import toast from "react-hot-toast"
import useAuthHook from "../hooks/useAuthHook";
const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  useAuthHook();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, userType },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      if(res.data.success){
        localStorage.setItem("authToken",res.data.token);
        localStorage.setItem("userType",res.data.user.userType);
        localStorage.setItem("userId",res.data.user._id);
      }

      
        if (res.data.user.userType === "vendor") {
          navigate("/vendor/dashboard");
        }
        if (res.data.user.userType === "customer") {
          navigate("/customer/dashboard");
        }

          toast.success(res.data.message);
    } catch (error) {
      console.log("login failed", error);
    } finally {
      setEmail("");
      setPassword("");
      setUserType("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="radio"
              value="vendor"
              checked={userType === "vendor"}
              onChange={() => setUserType("vendor")}
              required
            />
            Vendor
          </label>
          <label>
            <input
              type="radio"
              value="customer"
              checked={userType === "customer"}
              onChange={() => setUserType("customer")}
              required
            />
            Customer
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don{"'"}t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
