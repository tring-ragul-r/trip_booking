import React from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { MdLock } from "react-icons/md";
import axios from "axios";
import "./signup.css";
import signupImg from "../assets/signup-bg-img.png";
import logo from "../assets/signup-logo.png";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
      console(response.data.data.signUp);
    } catch (error) {
      //console.error(error);
    }
  };
  return (
    <div className="signup-outer-con">
      <div className="signup-con1">
        <img src={signupImg} alt="" />
        <div className="signup-con1-inner">
          <img src={logo} alt="" />
          <h2>Start New Jounery!</h2>
          <div>
            <p>Already have an Account?</p>
            <button>Sign In</button>
          </div>
        </div>
      </div>
      <div className="signup-con2">
        <div className="signup-form-con">
          <h1>Create Account</h1>
          <form className="signup-form" onSubmit={handleSubmit(submit)}>
            <div className="form-body">
              <label>Name</label>
              <div className="input-con">
                {" "}
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: "Name required" })}
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
                {" "}
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
                {" "}
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "password required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
                      message: "password format is wrong",
                    },
                  })}
                />
              </div>
              <span className="signup-icon">
                <MdLock />
              </span>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <a>forget your password?</a>
          <button type="submit">Sign Up</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default SignUp;
