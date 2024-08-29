import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css"
import axios from "axios";

const Login = () => {

//     const cookieString = document.cookie;
//     const cookies = cookieString.split("; ")
//     const authTokenCookie = cookies.find(cookie => cookie.startsWith("authToken="));

//     console.log(authTokenCookie);

//   if (authTokenCookie) {
//     // Extract the value of the authToken
//     const authToken = authTokenCookie.split("=")[1];
//     // return authToken;
//     console.log(authToken);
//   }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/login",{email,password,userType})
    
    
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
