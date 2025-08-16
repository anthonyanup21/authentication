import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const {logout}=useAuthStore()
  
  const handleLogout = async () => {
    try {
      await logout()

      toast.success("Logged out Successfully");
    } catch (error) {
      console.log(error)
      toast.error("cannot log out")
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">MyApp</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-error" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Page content */}
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-bold">Welcome to the Home Page 🎉</h1>
      </div>
    </div>
  );
};

export default Home;
