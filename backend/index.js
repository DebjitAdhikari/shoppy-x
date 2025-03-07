import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/database.js"
import productsRouter from "./routers/productsRouter.js"
import userRouter from "./routers/userRouter.js"
import contactRouter from "./routers/contactRouter.js"
import reviewRouter from "./routers/reviewRouter.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app =express()
app.use(cors({
    origin:"http://localhost:5173",
    method:["GET", "POST", "PUT","PATCH", "DELETE"],
    credentials:true
}))
//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

//request
//connect the database
connectDB()


app.use("/api/v1/products",productsRouter)
app.use("/api/v1/reviews",reviewRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/contact",contactRouter)


app.use("*",(req,res,next)=>{
    res.status(404).json({
        status:"error",
        message:"This page is not found"
    })
})

//Global error handling
app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).json({
        status:"error",
        message: err.message||"Something went wrong",
        details:err
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("server is running...")
})
