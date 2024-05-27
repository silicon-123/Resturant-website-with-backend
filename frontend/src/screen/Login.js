import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email)
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
    <div><Navbar /></div>
      <div className='container'>
        <form onSubmit={handleSubmit} className='w-50 mt-5 border bg-dark border-success rounded mr-3'>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/Signup" className='m-3 btn btn-danger'>I'm a new User</Link>
        </form>
      </div>
    </div>
  )
}
