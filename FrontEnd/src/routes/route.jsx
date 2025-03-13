import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Package from "../pages/Package";
import BookPackage from "../pages/BookPackage";
import PackageCart from "../pages/PackageCart";
import LandlingPage from "../pages/LandlingPage";
import ProtectedRoute from "../component/protectedRoutes/ProtectedRoute";
import RestrictedRoute from "../component/protectedRoutes/RestrictedRoute";
import AllPackages from "../pages/AllPackages";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import Faqs from "../component/faqs/Faqs";
const Routers = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <RestrictedRoute>
              <LandlingPage />
            </RestrictedRoute>
          }
        />
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
        <Route path = '/faqs' element={<Faqs/>} />
      </Routes>
    </>
  );
};

export default Routers;
