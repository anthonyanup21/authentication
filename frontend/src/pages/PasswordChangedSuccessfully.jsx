import React, { use } from "react";
import { useNavigate } from "react-router";

const PasswordChangedSuccessfully = () => {
  const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
        <div className="text-green-500 text-5xl mb-4">✔</div>
        <h2 className="text-2xl font-bold mb-2">Password Changed!</h2>
        <p className="mb-6 text-gray-500">
          Your password has been successfully updated.
        </p>
        <button className="btn btn-primary w-full" onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    </div>
  );
};

export default PasswordChangedSuccessfully;
