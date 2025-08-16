import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";

const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const { signup,isLoading } = useAuthStore();

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);

      navigate("/verification")
    } catch (error) {
      console.log(error)
      
      toast.error(error.response.data.message||"something went wrong")
    }
  }

    return (
      <div className="h-screen flex justify-center items-center">
        <div className="rounded-2xl bg-base-200 p-10 relative">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center w-full text-3xl font-extrabold pb-4">
              <h1>Signup!</h1>
            </div>
            <p className="text-xs p-2">username</p>
            <label className="input validator h-11">
              <FaUser />
              <input
                type="text"
                placeholder="John Doe"
                required
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </label>
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
            <p className="text-xs p-2 ">Password</p>

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

            <div className="flex justify-center items-center mt-6  ">
              <button
                className="btn btn-primary px-10 "
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-md "></span>
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-base-300 h-3 flex justify-center items-center text-xs p-4 absolute bottom-19 w-[342px] rounded-b-2xl ">
          Alreday have an account?&nbsp;{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </div>
      </div>
    );
  };

export default Signup;
