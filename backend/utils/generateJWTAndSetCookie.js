import jwt from "jsonwebtoken"

export const generateJWTAndSetCookie=(res,id)=>{
    const payload={id}//data you want to store
    const secret=process.env.SECRET_KEY

    const options={expiresIn:"7d"} //token expiry

    const token=jwt.sign(payload,secret,options) //generate token

    //send token in cookie

    res.cookie("jwt",token,{
        httpOnly: true,      //  prevents xss attack
        secure: process.env.ENV=="production",        // only sent over HTTPS (set false for localhost)
        sameSite: "strict",  // prevents CSRF
        maxAge: 7*24 * 60 * 60 * 1000 // 7 day
    })

}