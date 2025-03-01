import mongoose from "mongoose";
const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A user should have a name."]
    },
    profileImage:{
        url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    email:{
        type:String,
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
const User = mongoose.model("User",userModel)
export default User