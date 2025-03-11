import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import './ShowPassword.css'

const ShowPassword = ({ show, setShow }) => {
  return (
    <div>
      <button className="eye-logo-icon" onClick={() => setShow(!show)}>
        {show ? <IoMdEye /> : <IoMdEyeOff />}
      </button>
    </div>
  );
};

export default ShowPassword;
