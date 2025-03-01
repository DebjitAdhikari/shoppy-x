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
    category:String,
    images:[{
        url:String,
        public_id:String
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }]
})

const Product = mongoose.model("Products",productSchema)
export default Product