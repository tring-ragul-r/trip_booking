import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Package from "../pages/Package";
import BookPackage from "../pages/BookPackage";
import PackageCart from "../pages/PackageCart";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/package/:location" element={<Package />} />
      <Route path="/bookpackage" element={<BookPackage />} />
      <Route path = "/cart" element={<PackageCart />} />
    </Routes>
  );
};

export default Routers;
