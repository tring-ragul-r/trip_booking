import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { MdLock } from "react-icons/md";
import axios from "axios";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import signinImg from "../assets/signup-bg-img.png";
import logo from "../assets/signup-logo.png";
const SignIn = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    const query = `
        query {
        signIn(email: "${data.email}", password: "${data.password}"){
        id
        name
        email
        }
      }
    `;

    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query,
      });

      console.log(response.data.data.signIn);
      if(response.data.data.signIn){
      navigator("/home");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="signin-outer-con">
      <div className="signin-con1">
        <img src={signinImg} alt="" />
        <div className="signin-con1-inner">
          <img src={logo} alt="" />
          <h2>LogIn To Travel</h2>
          <div>
            <p>Don't have an Account?</p>
            <button>Sign Up</button>
          </div>
        </div>
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
                    pattern: {
                      value: /^[a-z0-9-._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Email format is incorrect",
                    },
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
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
                      message: "Password format is incorrect",
                    },
                  })}
                />
              </div>
              <span className="signin-icon">
                <MdLock />
              </span>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
