import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A product must have name"]
    },
    price:Number,
    discount:Number,
    inStock:Number,
    rating:Number,
    description:String,
    availableSize:String, 
    features:String,
    images:[String]
})

const Product = mongoose.model("Products",productSchema)
export default Product