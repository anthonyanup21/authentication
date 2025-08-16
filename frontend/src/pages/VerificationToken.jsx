import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
const VerificationToken = () => {
  const [formData, setformData] = useState(["", "", "", "", "", ""]);
  const { verifyEmail, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    setformData((prev) => {
      const newData = [...prev];
      newData[index] = value;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(formData.join(""));
      toast.success("Verification Successfull");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Enter Verification Code
        </h2>
        <p className="mb-4 text-center text-sm text-gray-500">
          We have sent a verification code to your email.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2 mb-6">
            <input
              type="text"
              maxLength="1"
              className="input input-bordered w-12 text-center"
              value={formData[0]}
              onChange={(e) => {
                handleChange(0, e.target.value);
              }}
            />

            <input
              type="text"
              maxLength="1"
              className="input input-bordered w-12 text-center"
              value={formData[1]}
              onChange={(e) => {
                handleChange(1, e.target.value);
              }}
            />

            <input
              type="text"
              maxLength="1"
              className="input input-bordered w-12 text-center"
              value={formData[2]}
              onChange={(e) => {
                handleChange(2, e.target.value);
              }}
            />

            <input
              type="text"
              maxLength="1"
              className="input input-bordered w-12 text-center"
              value={formData[3]}
              onChange={(e) => {
                handleChange(3, e.target.value);
              }}
            />

            <input
              type="text"
              maxLength="1"
              className="input input-bordered w-12 text-center"
              value={formData[4]}
              onChange={(e) => {
                handleChange(4, e.target.value);
              }}
            />

            <input
              type="text"
              maxLength="1"
              className="input input-bordered w-12 text-center"
              value={formData[5]}
              onChange={(e) => {
                handleChange(5, e.target.value);
              }}
            />
          </div>

          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md "></span>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default VerificationToken;
