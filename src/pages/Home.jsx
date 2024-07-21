import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username, phone number or email is required"),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters")
    .max(30, "Password cannot exceed 30 characters")
    .required("Password is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/otp");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="contentSec">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="title">Log In</div>
        <div className="subText">
          Glad you're back, let's get back to business
        </div>
      </div>
      <div className="loginWrapper">
        <div className="loginSec">
          <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="username">Phone number, email or username</label>
            <div className="formInput">
              <input
                name="username"
                type="text"
                placeholder="Enter phone number, email or username"
                required
                {...register("username")}
              />
            </div>
            <FormErrMsg errors={errors} inputName="username" />
            <label htmlFor="password">Password</label>
            <div className="formInput">
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                required
                {...register("password")}
              />
              <i className="fa-regular fa-eye"></i>
            </div>
            <FormErrMsg errors={errors} inputName="password" />
            <div className="fp">Forgot password?</div>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Log In"}
            </button>
            <div className="dontHveAcc">
              Don't have an account? <b>Sign Up</b>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
