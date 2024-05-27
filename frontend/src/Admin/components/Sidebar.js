import React from "react";
import './Sidebar.css'
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            < div className="sidebar-options">
            <NavLink to='/Add' className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                   
                </NavLink>
            <NavLink to='/List' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                 
                </NavLink>
                <NavLink to='/Orders' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                  
                </NavLink>

                
            </div>
        </div>
    )
}
export default Sidebar;