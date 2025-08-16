import React from 'react'
import { useNavigate } from 'react-router'

const PasswordResetLinkSent = () => {
  const navigate=useNavigate()
  return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Reset Link Sent</h2>
        <p className="text-gray-500 mb-6">
          A password reset link has been sent to your email.  
          Please check your inbox to proceed.
        </p>
        <button className="btn btn-primary w-full" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    </div>
  )
}

export default PasswordResetLinkSent