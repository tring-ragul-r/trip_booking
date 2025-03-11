import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Package from "../pages/Package";
import BookPackage from "../pages/BookPackage";
import PackageCart from "../pages/PackageCart";
import LandlingPage from "../pages/LandlingPage";
import ProtectedRoute from "../component/ProtectedRoutes/ProtectedRoute";
import AllPackages from "../pages/AllPackages";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
const Routers = () => {
  return (
    <>
    <ScrollToTop/>
    <Routes>
      <Route path="/" element={<LandlingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/package/:location"
        element={
          <ProtectedRoute>
            <Package />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookpackage"
        element={
          <ProtectedRoute>
            <BookPackage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
           <ProtectedRoute>
            <PackageCart />
           </ProtectedRoute>
        }
      />
      <Route
        path="/allpackages"
        element={
          <ProtectedRoute>
            <AllPackages />
          </ProtectedRoute>
        }
      />
      
    </Routes>
    
    </>

  );
};

export default Routers;
