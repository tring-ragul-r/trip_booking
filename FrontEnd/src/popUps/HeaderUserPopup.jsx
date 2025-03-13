import React from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import './HeaderUserPopup.css'
import { useNavigate } from 'react-router-dom';
const HeaderUserPopup = ({popup}) => {
  const userData = JSON.parse(localStorage.getItem("userData"))
const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("userData");
        popup(false);
        navigate("/");
      };
      
  return (
    <div className='header-popup-container'>
        <div className='header-popup-body'>
            <div className='header-email-popup-container'>
            <HiOutlineUserCircle className='user-logo-popup'/><p className='header-popup-email'>{userData?.email}</p>
            </div>
            <button className='logout-button' onClick={() => handleLogout()}>logout</button>
        </div>
    </div>
  )
}

export default HeaderUserPopup