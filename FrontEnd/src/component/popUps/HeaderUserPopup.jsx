import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./HeaderUserPopup.css";
import { useNavigate } from "react-router-dom";
import UserProfilePopup from "./UserProfilePopup"; // Import the UserProfilePopup component

const HeaderUserPopup = ({ popup }) => {
  const [profilePopup, setProfilePopup] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    popup(false);
    navigate("/");
  };

  const handleProfile = () => {
    setProfilePopup(true); // Show the UserProfilePopup
  };

  const closeProfilePopup = () => {
    setProfilePopup(false); // Hide the UserProfilePopup
  };

  return (
    <div>
      <div className="header-popup-container">
        <div className="header-popup-body">
          <div className="header-email-popup-container">
            <HiOutlineUserCircle
              className="user-logo-popup"
              onClick={handleProfile}
            />
            <p className="header-popup-profile" onClick={handleProfile}>
              Profile
            </p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {profilePopup && <UserProfilePopup closePopup={closeProfilePopup} />}
    </div>
  );
};

export default HeaderUserPopup;
