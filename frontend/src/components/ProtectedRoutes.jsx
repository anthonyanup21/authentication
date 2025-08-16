import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate, useNavigate } from 'react-router'

const ProtectedRoutes = ({children}) => {
    const {user,isAuthenticated}=useAuthStore()
    const navigate=useNavigate()
    if (!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    if(!user.isVerified){
        return <Navigate to="/verification" replace/>
    }
    return children

 
}

export default ProtectedRoutes