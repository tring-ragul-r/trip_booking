import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const ShowPassword = ({ show, setShow }) => {
  return (
    <div>
      <div onClick={() => setShow(!show)}>
        {show ? <IoMdEye /> : <IoMdEyeOff />}
      </div>
    </div>
  );
};

export default ShowPassword;
