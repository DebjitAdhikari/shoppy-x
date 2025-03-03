import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A user should have a name."]
    },
    password:{
        type:String,
        select:false,
        required:[true,"Password is required"],
    },
    profileImage:{
        url:{
            type:String,
            default:"https://res.cloudinary.com/dy5s9hgoa/image/upload/v1740895975/ShoppyX/Users/ndcuvtpn9uhiuxxsxnyr.png",
            // required:true
        },
        public_id:{
            type:String,
            default:"ShoppyX/Users/default_profile_image"
            // required:true
        }
    },
    email:{
        type:String,
        unique:true,
        required:[true,"User should have a email id"]
    },
    contactNo:{
        type:Number,
        required:[true,"User should have a Contact No."]
    },
    address:{
        area:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        postalCode:{
            type:Number,
            required:true
        }
    },
})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,12)
    next()
})
userSchema.methods.checkPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User",userSchema)
export default User