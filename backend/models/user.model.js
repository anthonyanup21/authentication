import mongoose from "mongoose";

const {Schema} =mongoose

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },

    
    resetPasswordToken:{//token when you want to reset password
        type:String
    }, 
    resetPasswordTokenExpiresAt:{
        type:Date
    },
    verificationToken:{ //token when you want to verify your account
        type:String

    },  
    verificationTokenExpiresAt:{
        type:Date

    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema)

