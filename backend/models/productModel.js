import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A product must have name"]
    },
    actualPrice:Number,
    discount:Number,
    finalPrice:Number,
    inStock:Number,
    rating:Number,
    description:String,
    availableSize:String, 
    features:String,
    category:String,
    featuredProduct:{
        type:Boolean,
        default:false
    },
    images:[{
        url:String,
        public_id:String
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }]
})

productSchema.pre("save", function(next){
    if(this.isModified("discount") || this.isModified("actualPrice"))
        this.finalPrice = Math.round(this.actualPrice - (this.actualPrice * this.discount)/100)
    next()
})
const Product = mongoose.model("Products",productSchema)
export default Product