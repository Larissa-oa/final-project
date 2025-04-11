import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
 

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

function handleSignup(event) {
event.preventDefault()

const newUser = {username, email, password}
axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, newUser)
.then((res) => {
console.log("user created in DB", res)
nav("/login")
})
.catch(error => {
  console.log(error)
})
}

  return (
    <div>
      <h2>Sign Up with us</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input type="text" placeholder="enter a Username" 
          value= {username} onChange={(e) =>{setUsername(e.target.value)}}/>
        </label>
        <label>
          Email: 
          <input type="email" placeholder="enter your Email"  
          value= {email} onChange={(e) => {setEmail(e.target.value)}} />
        </label>
        <label>
          Password:
          <input type="password" placeholder="enter your Password"
          value= {password} onChange={(e) => {setPassword(e.target.value)}} /> {/*controled component*/}
        </label>
        <button>SignUp!</button>
      </form>
      <p>Already a member?</p> <Link to="/login"><button>LogIn</button></Link>
    </div>
  )
}

export default SignupPage
