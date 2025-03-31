import mongoose from "mongoose";
import huggingFaceApi from "../config/hugginFaceApi.js";
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
    }],
    vector:{
        type:[Number],
        select:false
    }
})

productSchema.pre("validate",async function(next){
    if(this.isModified("description")||this.isModified("name")||this.isModified("category")){
        const name = this.name || "";
        const description = this.description || "";
        const category = this.category || "";
        const embeddingText = `name:${name} description: ${description} category: ${category}`
        const embeddings = await huggingFaceApi.featureExtraction({
            model:"sentence-transformers/all-MiniLM-L6-v2",
            inputs: embeddingText,
        })
        this.vector = embeddings
    }
    next()
})
productSchema.pre("save", function(next){
    if(this.isModified("discount") || this.isModified("actualPrice"))
        this.finalPrice = Math.round(this.actualPrice - (this.actualPrice * this.discount)/100)
    next()
})
const Product = mongoose.model("Products",productSchema)
export default Product