import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const NewPassword = () => {
  const [newPass, setnewPass] = useState("");
  const [conformPass, setconformPass] = useState("");
  const { resetPassword, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newPass != conformPass) {
        toast.error("password doesnt match");
        return;
      }
      await resetPassword(id, newPass);
      toast.success("password reset successfull");
      navigate("/password-changed");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in newpassword", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Set New Password
        </h2>
        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-xs p-2">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="input input-bordered w-full"
              value={newPass}
              onChange={(e) => setnewPass(e.target.value)}
            />
          </div>

          {/* Confirm New Password */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-xs p-2">
                Confirm New Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="input input-bordered w-full"
              value={conformPass}
              onChange={(e) => setconformPass(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={isLoading}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
