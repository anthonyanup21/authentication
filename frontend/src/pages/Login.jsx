import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";

import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const navigate=useNavigate()
  const {login,isLoading}=useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email,password)
      navigate("/")
      toast.success("Logged In successfully")

      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)      
    }
  
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-2xl bg-base-200 p-10 relative">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center w-full text-3xl font-extrabold pb-4">
            <h1>Login!</h1>
          </div>
          {/*email*/}
          <p className="text-xs p-2">email</p>

          <label className="input validator h-11">
            <MdEmail />
            <input
              type="email"
              placeholder="mail@site.com"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </label>

          {/*password*/}
          <p className="text-xs p-2 mt-3">Password</p>

          <label className="input validator w-65 h-11 relative pr-7">
            <FaKey />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={(e) => setpassword(e.target.value)}
            />
            <div
              className="absolute left-59 cursor-pointer "
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </label>

          <div className="text-xs my-2 text-blue-400 flex justify-end">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <div className="flex justify-center items-center mt-4 ">
            <button className="btn btn-primary px-10" type="submit" disabled={isLoading}>
             { isLoading? <span className="loading loading-spinner loading-md "></span>:"Login"}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-base-300 h-4 flex justify-center items-center text-xs p-5 absolute bottom-23 w-[342px] rounded-b-2xl ">
        Don't have an account?&nbsp;{" "}
        <Link to="/signup" className="text-blue-400">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
