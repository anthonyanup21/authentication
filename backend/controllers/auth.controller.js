import { error } from "console"
import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import { generateJWTAndSetCookie } from "../utils/generateJWTAndSetCookie.js"
import {sendVerificationEmail,SendResetPasswordEmail,resetPasswordSuccessfullEmail} from "../utils/sendEmail.js"


export const login = async (req, res) => {

    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(400).json({success:false, message: "enter complete details" })

        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({success:false, message: "user not found" })

        const correctPassword=await bcrypt.compare(password,user.password)
        if (!correctPassword) return res.status(400).json({success:false,message:"wrong password"})
        await generateJWTAndSetCookie(res,user._id)

        res.status(200).json({...user._doc,password:null})

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
        console.log("error in login controller\n", error)


    }
}

export const signup = async (req, res) => {
    const { username, email, password } = req.body

    try {
        if (!username.trim() || !email.trim() || !password.trim()) return res.status(400).json({success:false, message: "All fields are required" })

        const emailAlredayExists = await User.findOne({ email })
        const usernameAlredayExists = await User.findOne({ username })

        if (usernameAlredayExists || emailAlredayExists) return res.status(400).json({success:false, message: "User alreday exists" })


        const hashedPassword = await bcrypt.hash(password, 10) //hashing the password using bcrypt
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //expires in 1 day
        })

        await user.save()

        //jwt
        generateJWTAndSetCookie(res, user._id)

        //send email
        await sendVerificationEmail(user.username,user.email,user.verificationToken)

        res.status(201).json({ message: "user created successfully",  ...user._doc, password: null  })




    } catch (error) {
        res.status(500).json({success:false, message: "internal server error" })
        console.log("error in signup controller\n", error)

    }
}

export const verifyEmail=async(req,res)=>{

    const {code}=req.body
    try {
        const user=await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })

        if (!user) return res.status(404).json({success:false,message:"Invalid or expired verification code"})

        user.isVerified=true
        user.verificationToken=undefined
        user.verificationTokenExpiresAt=undefined
        await user.save()
        res.status(200).json({user:{...user._doc,password:null},message:"account verified successfully"})

        //if you want you can send welcome email here
        
    } catch (error) {
        console.log("error in verify email controller\n",error)
        res.status(500).json({success:false,message:"internal server error"})
        
    }
    
}

export const logout = async (req, res) => {
    res.clearCookie("jwt")
    res.status(200).json({message:"logged out successfully"})
}

export const forgotPassword=async (req,res)=>{

    const {email}=req.body
    try {
        if (!email) return res.status(400).json("enter complete details")
    
    
        const user=await User.findOne({email})
        if (!user) return res.status(404).json({message:"user not found"})
    
        const resetPasswordToken=Math.floor(1000000000 + Math.random() * 9000000000).toString() //10 digit code
    
        user.resetPasswordToken=resetPasswordToken
        user.resetPasswordTokenExpiresAt=Date.now()+1*60*60*1000 //1 hour
    
        await user.save()
    
        await SendResetPasswordEmail(user.username,user.email,`${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)
        res.status(200).json({message:"reset password token sent successfully"})
    
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
        console.log("error in forgot password controller\n", error)

        
    }
}

export const resetPassword=async (req,res)=>{
    const {id}=req.params
    const {newPassword}=req.body
    try {
        if (!newPassword || !id) return res.status(400).json({message:"all fields are required"})

        const user=await User.findOne({resetPasswordToken:id ,resetPasswordTokenExpiresAt:{$gt:Date.now()}})

        if (!user) return res.status(404).json({message:"invalid link  or link expired"})

        const hashedPassword=await bcrypt.hash(newPassword,10)

        user.password=hashedPassword
        user.resetPasswordToken=null
        user.resetPasswordTokenExpiresAt=null
        await user.save()

        await resetPasswordSuccessfullEmail(user.email,user.username)

        res.status(200).json({message:"reset password successfully"})

        
    } catch (error) {

        res.status(500).json({ message: "internal server error" })
        console.log("error in resetPassword controller\n", error)

        
    }


}

export const checkAuth=async(req,res)=>{
    try {

        const user=await User.findById(req.userId).select("-password")
    


        if(!user) return res.status(400).json({success:false,message:"user not found"})
        
        res.status(200).json({user})
        
    } catch (error) {

        console.log("error in check auth controller",error)

        res.status(500).json({message:"internal server error"})
        
    }
}
  


    



