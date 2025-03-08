import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  
    // setLog(localStorage?.getItem('log'));

  function handleLogout() {
    localStorage.removeItem('userData');
    navigate("/signup");
  }
  return (
    <header className="app-header">
      <div className="header-con">
        <h1 className="logo">TringTrip</h1>

        <nav className="nav-menu">
          <button className="nav-button" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="nav-button" onClick={() => navigate("/cart")}>
            Cart
          </button>
        </nav>
        <p>{userData?.name}</p>
        <div>
          {
            !userData ? 
            <div>
              <button onClick={()=>navigate('/signin') } >sign in</button>
              <button onClick={()=>navigate('signup')}>Sign Up</button>
            </div>:
            <button onClick={()=>{handleLogout()}}>Logout</button>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
