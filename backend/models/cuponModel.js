import mongoose from "mongoose"
const cuponSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    discountPrice:Number
})
const Cupon = mongoose.model("Cupons",cuponSchema)
export default Cupon