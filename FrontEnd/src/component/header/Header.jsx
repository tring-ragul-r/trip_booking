import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./Header.css";
import HeaderUserPopup from "../popUps/HeaderUserPopup";
import TringTripLogo from "../../assets/TringTrip_logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleLogo = () => {
    if (userData?.name) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  };
  const handleFaqs = () => {
    navigate("/home");
    setTimeout(() => {
      document
        .getElementById("home-faq-container")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="app-header">
      <div className="header-con">
        <img
          className="tringtrip-logo"
          src={TringTripLogo}
          alt="TringTrip"
          onClick={() => {
            handleLogo();
          }}
        />
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
              My Bookings
            </button>
            <button className="nav-btn" onClick={() => handleFaqs()}>
              FAQs
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
        {showProfile && <HeaderUserPopup popup={setShowProfile} />}
      </div>
    </header>
  );
};

export default Header;
