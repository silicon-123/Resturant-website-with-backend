import React from "react";
import './Navbar.css';
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo-container">
                <img className='logo' src={assets.logo} alt="Logo" />
                <h1 className='navbar-title'>HealthyFood</h1>               
            </div>
            
            <div className="nav-links">
                <Link to="/ALogin" className="nav-link">Login</Link>
                <Link to="/Signin" className="nav-link">Signup</Link>
                <Link to="/" className="nav-link">Home</Link>
                <img className='profile' src={assets.profile_image} alt="Profile" />
            </div>
        </div>
    );
};

export default Navbar;
