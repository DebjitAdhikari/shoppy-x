import User from "../models/userModel.js";
import jwt, { decode } from "jsonwebtoken"
function getToken(id){
  return jwt.sign({id},process.env.JWT_SECRET_KEY,{
    expiresIn:"10d"
  })
}
export async function createUser(req, res, next) {
  try {
    const { name, password, confirmPassword, email, contactNo, area, city, state, country, postalCode } = req.body

    
    if(password!==confirmPassword)
      return res.status(400).json({
        status:"failed",
        message:"Password and confirm password should be same"
      })
    const newUser={
      name,
      email,
      password,
      contactNo,
      address:{
        area,
        city,
        state,
        country,
        postalCode
      }
    }
    const user = await User.create(newUser)
    if(!user) 
      return res.status(400).json({
        status:"failed",
        message:"User couldn't be created"
      })
    const token = getToken(user._id)
    res.cookie("jwt",token,{
      httpOnly:true,
      secure:true,
      sameSite:"Strict",
      maxAge: 10 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({
      status:"success",
      token,
      data:user
    })
  } catch (err) {
    next(err)
  }
}
export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({})
    // console.log(req.user)
    res.status(200).json({
      status:"success",
      data:users
    })
  } catch (err) {
    next(err)
  }
}
export async function getUser(req, res, next) {
  try {
    if(!req.params.userId)
      return res.status(400).json({
        status:"failed",
        message:"User not found"
      })
    const user = await User.findById(req.params.userId)
    res.status(200).json({
      status:"success",
      data:user
    })
  } catch (err) {
    next(err)
  }
}
export async function signIn(req, res, next) {
  try {
    if(!req.body.password || !req.body.email)
      return res.status(400).json({
        status:"failed",
        message:"Email and Password is required"
      })
    const user = await User.findOne({email:req.body.email}).select("+password")//cuz password was select false
    
    if(!user)
      return res.status(400).json({
        status:"failed",
        message:"User not found"
      })
    if(! await user.checkPassword(req.body.password))
      return res.status(400).json({
        status:"failed",
        message:"Invalid Password"
      })
    const token = getToken(user._id)
    res.cookie("jwt",token,{
      httpOnly:true,
      secure:true,
      sameSite:true,
      maxAge:10 * 24 * 60 * 60 * 1000
    })
    user.password=undefined // dont wanna show the password as response
    res.status(200).json({
      status:"success",
      token,
      data:user
    })
        
  } catch (err) {
    next(err)
  }
}
export async function updateUser(req, res, next) {
  try {
    if(!req.body.password || !req.body.email)
      return res.status(400).json({
        status:"failed",
        message:"Email and Password is required"
      })
    const user = await User.findOne({email:req.body.email}).select("+password")//cuz password was select false
    
    if(!user)
      return res.status(400).json({
        status:"failed",
        message:"User not found"
      })
    if(! await user.checkPassword(req.body.password))
      return res.status(400).json({
        status:"failed",
        message:"Invalid Password"
      })
    res.status(200).json({
      status:"success",
      data:user
    })
        
  } catch (err) {
    next(err)
  }
}
export async function deleteUser(req, res, next) {
  try {
    if(!req.params.userId)
      return res.status(400).json({
        status:"failed",
        message:"User id is required"
      })
    const user = await User.findByIdAndDelete(req.params.userId)
    
    if(!user)
      return res.status(400).json({
        status:"failed",
        message:"User not found"
      })
    
    res.status(200).json({
      status:"success",
      data:null
    })
        
  } catch (err) {
    next(err)
  }
}
export async function protectRoute(req,res,next){
  try {
    const token = req.cookies.jwt
    if(!token) 
      return res.status(401).json({
        status:"failed",
        message: "You are not logged in"
      })
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decodedToken.id).select("-password")
    next()
  } catch (err) {
    next(err)
  }
}
export async function updateMe(req,res,next){
  try {

    const { name, email, contactNo, area, city, state, country, postalCode } = req.body
    
    const userData={
      name,
      contactNo,
      address:{
        area,
        city,
        state,
        country,
        postalCode
      }
    }
    
    const user = await User.findByIdAndUpdate(req.user.id,userData,{new:true})
    if(!user)
      return res.status(400).json({
        status:"failed",
        message:"User not found"
      })
    res.status(200).json({
      status:"success",
      data:user
    })
    
  } catch (err) {
    next(err)
  }
}
export async function updateMyPassword(req,res,next) {
  try {
    const {currentPassword,newPassword,confirmPassword}=req.body
    console.log(currentPassword,newPassword,confirmPassword)
    const user = await User.findById(req.user._id).select("+password")
    if(!await user.checkPassword(currentPassword))
      return res.status(400).json({
        status:"failed",
        message:"Incorrect Password"
      })
    if(newPassword!==confirmPassword)
      return res.status(400).json({
        status:"failed",
        message:"Password should be same as confirm password"
      })
      
    user.password=newPassword
    await user.save()
    res.status(200).json({
      status:"success",
      data:user
    })

  } catch (err) {
    next(err)
  }
}