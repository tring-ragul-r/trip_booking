import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  function handleLogout() {
    localStorage.removeItem("userData");
    navigate("/");
  }

  return (
    <header className="app-header">
      <div className="header-con">
        <h1 className="logo">TringTrip</h1>
        {userData && (
          <>
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
                Booked Packages
              </button>
            </nav>
            <div className="user-name-container">
              <HiOutlineUserCircle/>
            <p className="user-name">{ userData?.name}</p>
            </div>
          </>
        )}
        <div>
          {!userData ? (
            <div className="auth-btn-con">
              <button className="auth-btn" onClick={() => navigate("/signin")}>
                Sign In
              </button>
              <button className="auth-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>
          ) : (
            <div className="auth-btn-con">
              <button className="auth-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
