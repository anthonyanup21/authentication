import nodemailer from "nodemailer"
import {verificationTokenTemplate,resetPasswordTemplate,passwordResetSuccessTemplate} from "../lib/emailTemplate.js"

export const sendVerificationEmail = async (username,email,verificationToken) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    })

    //define email

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Hello from Auth Project",
        text: "verification code",
        html: verificationTokenTemplate(username,verificationToken)


    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error while sending verification code:", error);
        }
        console.log("Email sent:", info.response);
    });

}

export const SendResetPasswordEmail=async(username,email,resetPasswordLink)=>{

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    })

    //define email

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Hello from Auth Project",
        text: "reset Password Token",
        html: resetPasswordTemplate(username,resetPasswordLink)


    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error while sending reset password link code:", error);
        }
        console.log("Email sent:", info.response);
    });

}

export const resetPasswordSuccessfullEmail=async(email,username)=>{

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    })

    //define email

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Hello from Auth Project",
        text: "verification code",
        html: passwordResetSuccessTemplate(username)


    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error while sending reset password success email:", error);
        }
        console.log("Email sent:", info.response);
    });

}

