import React, { useState, useContext } from 'react'
import {Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext"
import axios from 'axios';
import nature from "../assets/images/nature.mp4"
import "./LoginPage.css"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

function handleLogin(event) {
  event.preventDefault();
  const userToLogin = { email, password };
  //here we send the userToLogin to our DB
  axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userToLogin)
  .then((res)=>{
    console.log("user logged in", res.data);
    localStorage.setItem("authToken", res.data.authToken);
    return authenticateUser();
  })
  .then(() => {
    nav("/profile");
  })
  .catch((err) => {
    console.log(err);
    setErrorMessage(err.response.data.errorMessage);
  });

}

  return (
    <div className="login-container">
    <div className="video-section">
      <video className="background-video" autoPlay muted loop>
        <source src={nature} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div className ="signin-page">
      <h3>Access Your Account</h3>
      <form className="form-login-page" onSubmit={handleLogin}>
          <label>
              Email:
              <input type="email" placeholder="enter an email"
              value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          </label>
          <label>
              Password:
              <input type="password" placeholder=""
              value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </label>
          <button type="submit">Login</button>
      </form>
      {errorMessage ? <p className="error">{errorMessage}</p> : null}
      
      <p>
      <Link className="signup-link" to="/signup">
      <p>Not yet a user?</p>
       <button> Sign Up</button>
      </Link>
      </p>
    </div>
    </div>
  )
}
export default LoginPage;
