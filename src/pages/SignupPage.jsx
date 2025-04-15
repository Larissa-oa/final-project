import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./SignupPage.css"

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')

  const nav = useNavigate()
  async function handleSignup(event) {
    event.preventDefault();
  
    try {
      const data = new FormData();
      data.append("file", profileImage);
      data.append("upload_preset", "Ontrack");
      data.append("cloud_name", "dzne6fm6i");
  
      // ⬇️ Await the image upload
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dzne6fm6i/image/upload",
        data
      );
  
      console.log("res: ", uploadRes.data); // should now contain the uploaded image data
  
      // Use the uploaded image URL
      const newUser = {
        username,
        email,
        password,
        profileImage: uploadRes.data.secure_url,
      };
  
      // ⬇️ Create the user
      const signupRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        newUser
      );
  
      console.log("user created in DB", signupRes);
      nav("/login");
  
    } catch (error) {
      console.log("Error during signup:", error);
    }
  }
  

  return (
    <div className ="signin-page">
      <h3>Sign Up with us</h3>
      <form className="signup-form" onSubmit={handleSignup}>
        <label>
          Username:
          <input type="text" placeholder="enter a username" 
          value= {username} onChange={(e) =>{setUsername(e.target.value)}}/>
        </label>
        <label htmlFor="profileImage">Category Image URL</label>
            <input 
            value = {FormData.profileImage}
              type="file" 
              name="profileImage" 
              required 
              placeholder="Enter a profile image" 
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
        <label>
          Email: 
          <input type="email" placeholder="enter your email"  
          value= {email} onChange={(e) => {setEmail(e.target.value)}} />
        </label>
        <label>
          Password:
          <input type="password" placeholder="enter your password"
          value= {password} onChange={(e) => {setPassword(e.target.value)}} /> {/*controled component*/}
        </label>
        <button>SignUp!</button>
      </form>
      <p>Already a member?</p> 
      <Link className="go-to-login" to="/login">
        <button>LogIn</button>
      </Link>
    </div>
  )
}

export default SignupPage
