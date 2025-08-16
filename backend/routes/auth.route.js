import express from "express"
import {login,signup,logout,verifyEmail,forgotPassword,resetPassword,checkAuth} from "../controllers/auth.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"
const router=express.Router()



router.post("/login",login)
router.post("/signup",signup)
router.get("/logout",logout)
router.post("/verify-email",verifyEmail)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:id",resetPassword)
router.get("/check-auth",verifyToken,checkAuth)


export default router