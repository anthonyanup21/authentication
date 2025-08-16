import { create } from "zustand"

import { axiosInstance } from "../lib/axiosInstance"
axiosInstance.defaults.withCredentials = true //google it

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    isLoading: false,
    isCheckingAuth: true,

    signup: async (username, email, password) => {
        set({ isLoading: true })
        try {

            const res = await axiosInstance.post("/signup", { username, email, password })

            set({ user: res.data, isAuthenticated: true, isLoading: false })

        } catch (error) {
            set({ isLoading: false })
            throw error


        }



    },

    verifyEmail: async (code) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.post("/verify-email", { code })
            set({ user: res.data.user, isLoading: false, isAuthenticated: true })
            return res.data.user
        } catch (error) {
            set({ isLoading: false })
            throw error

        }


    },

    login: async (email, password) => {
        set({ isLoading: true })
        try {

            const res = await axiosInstance.post("/login", { email, password })
            set({ user: res.data, isLoading: false, isAuthenticated: true })
    


        } catch (error) {
            set({ isLoading: false })
            throw error

        }

    },
    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get("/check-auth")
            set({ user: res.data.user, isCheckingAuth: false, isAuthenticated: true })
     

        } catch (error) {
            set({ isCheckingAuth: false,isAuthenticated:false })
          




        }


    },
    logout:async()=>{
        set({isLoading:true})
        try {
            const res=await axiosInstance.get("/logout")
            set({user:null,isAuthenticated:false,isLoading:false})

            
        } catch (error) {
            set({isLoading:false})
            throw error
        }

    },
    forgotPassword:async(email)=>{
        set({isLoading:true})

        try {
            const res=await axiosInstance.post("/forgot-password",{email})
            set({isLoading:false})
            
        } catch (error) {
            set({isLoading:false})
            throw error
            
        }


    },
    resetPassword:async(id,newPassword)=>{
        set({isLoading:true})
        try {
            await axiosInstance.post(`/reset-password/${id}`,{newPassword})
            set({isLoading:false})
            
        } catch (error) {
            set({isLoading:false})
            throw error
            
        }

    }

}))
