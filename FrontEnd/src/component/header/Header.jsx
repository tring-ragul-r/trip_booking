import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./Header.css";
import HeaderUserPopup from "../../popUps/HeaderUserPopup";
import TringTripLogo from '../../assets/TringTrip_logo.png'

const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <header className="app-header">
      <div className="header-con">
        
        <img className="logo" src={TringTripLogo} alt="" />
        {userData && (
          <nav className="nav-menu">
            <button className="nav-btn" onClick={() => navigate("/home")}>
              Home
            </button>
            <button
              className="nav-btn"
              onClick={() => navigate("/allpackages")}
            >
              All Packages
            </button>
            <button className="nav-btn" onClick={() => navigate("/cart")}>
              My Booking
            </button>
          </nav>
        )}
        <div>
          {!userData && (
            <div className="auth-btn-con">
              <button className="auth-btn" onClick={() => navigate("/signin")}>
                Sign In
              </button>
              <button className="auth-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>
          )}
        </div>
        {userData && (
          <div
            className="user-name-container"
            onClick={() => setShowProfile(!showProfile)}
          >
            <HiOutlineUserCircle />
            <p className="user-name">{userData?.name}</p>
          </div>
        )}
        {showProfile && <HeaderUserPopup popup={setShowProfile}/>}
      </div>
    </header>
  );
};

export default Header;
