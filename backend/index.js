import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/database.js"
import productsRouter from "./routers/productsRouter.js"
import userRouter from "./routers/userRouter.js"
dotenv.config()

const app =express()

//middlewares
app.use(express.json())
app.use(morgan("dev"))

//request
//connect the database
connectDB()


app.use("/api/v1/products",productsRouter)
app.use("/api/v1/users",userRouter)


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
