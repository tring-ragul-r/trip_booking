import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { MdLock } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import travelImg from "../assets/Auth_img.jpg";
import { toast } from "react-toastify";
import ShowPassword from "../component/showPassword/ShowPassword";

const SignUp = () => {
  const navigator = useNavigate();
  const[showPassword,setShowPassword] = useState(false);
  const[password,setPassword] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handlePassword = (e)=>{
    setPassword(e.target.value);
  }

  const submit = async (data) => {
    console.log("hi");

    const query = `
        mutation {
      signUp(name: "${data.name}", email: "${data.email}", password: "${data.password}")
    }
    `;

    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query,
      });

      if (response.data.data.signUp == "User signed up successfully!") {
        toast.success("User register Successfull");
        setPassword(null);
        navigator("/signin");
      } else {
        toast.error("user is already Exists");
      }
    } catch (error) {
      toast.error("User register ");
    }
  };
  return (
    <div className="signup-outer-con">
      <div className="signup-con1">
        <img src={travelImg} alt="" />
      </div>
      <div className="signup-con2">
        <div className="signup-form-con">
          <h1>Create Account</h1>
          <form className="signup-form" onSubmit={handleSubmit(submit)}>
            <div className="form-body">
              <label>Name</label>
              <div className="input-con">
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: "Name required", pattern:{
                    value:/^[A-Za-z ]+$/,
                    message:"name should contain alphabet only"
                  } })}
                  />
              </div>
              <span className="signup-icon">
                <FaUser />
              </span>
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
            <div className="form-body">
              <label>Email</label>
              <div className="input-con">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email required",
                    pattern: {
                      value: /^[a-z0-9-._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "email format is wrong",
                    },
                  })}
                />
              </div>
              <span className="signup-icon">
                <AiOutlineMail />
              </span>
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="form-body">
              <label>Password</label>
              <div className="input-con">
                <input
                  type={!showPassword?"password":"text"}
                  placeholder="Password"
                  {...register("password", {
                    required: "password required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
                      message: "password format is wrong",
                    },
                  })} onChange={handlePassword}
                />
               
              </div>
              <span className="signup-icon">
                <MdLock />
              </span>
            {password &&  <span className="signup-password-icon"><ShowPassword show={showPassword} setShow={setShowPassword} /></span>}
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <p className="have-account">
              Already have an Account ?
              <span
                onClick={() => {
                  navigator("/signin");
                }}
              >
                Sign In
              </span>
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
