import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./db/db.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
const app=express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRoutes)




connectDB().then(()=>{app.listen(3000,()=>{
    console.log("server running at port 3000")
})})