import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const {forgotPassword,isLoading}=useAuthStore()
  const [email, setemail] = useState("")
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
      await forgotPassword(email)
      navigate("/reset-link-sent")
      toast.success("email sent")

      
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
      
    }
    



  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Email Verification
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text p-1">Email </span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
            Send Verification Link
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword