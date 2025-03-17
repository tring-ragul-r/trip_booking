import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { MdLock } from "react-icons/md";
import axios from "axios";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import travelImg from "../assets/Auth_img.jpg";
import { toast } from "react-toastify";
import ShowPassword from "../component/showPassword/ShowPassword";

const SignIn = () => {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const submit = async (data) => {
    const query = `
        query {
        signIn(email: "${data.email}", password: "${data.password}"){
        id
        name
        }
      }
    `;

    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query,
      });

      if (response.data.data.signIn) {
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.data.signIn)
        );
        toast.success("Login Successfull!");
        setPassword(null);
        navigator("/home");
      }
      const errmsg = response?.data?.errors[0]?.message;

      if (errmsg == "user not found") {
        toast.error("user not found");
      } else if (errmsg === "Invalid password") {
        toast.error("Invalid password");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="signin-outer-con">
      <div className="signin-con1">
        <img src={travelImg} alt="" />
      </div>
      <div className="signin-con2">
        <div className="signin-form-con">
          <h1>Sign In</h1>
          <form className="signin-form" onSubmit={handleSubmit(submit)}>
            <div className="form-body">
              <label>Email</label>
              <div className="input-con">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email required",
                  })}
                />
              </div>
              <span className="signin-icon">
                <AiOutlineMail />
              </span>
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="form-body">
              <label>Password</label>
              <div className="input-con">
                <input
                  type={!showPassword ? "password" : "text"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password required",
                  })}
                  onChange={handlePassword}
                />
              </div>
              <span className="signin-icon">
                <MdLock />
              </span>
              {password && (
                <span className="signup-password-icon">
                  <ShowPassword show={showPassword} setShow={setShowPassword} />
                </span>
              )}
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <p className="have-account">
              Don't have an Account ?
              <span
                onClick={() => {
                  navigator("/signup");
                }}
              >
                Sign Up
              </span>
            </p>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
