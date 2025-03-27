import mongoose from "mongoose"
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        unique:true,
        trim:true
    },
    value:{
        type:String,
        required:[true,"Value is required"],
        unique:true,
        trim:true
    },
    image:{
        url:String,
        public_id:String
    }
})
const Category = mongoose.model("Categories",categorySchema)
export default Category