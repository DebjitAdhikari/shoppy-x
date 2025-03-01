import User from "../models/userModel.js";

export async function createUser(req,res,next){
    try {
        const{}
      const user = await Product.findById(req.params.id).populate("reviews")
      if(!product)
        return res.status(404).json({
          status:"failed",
          message:"Product not found"
        })
      res.status(200).json({
        status:"success",
        data:product
      })
    } catch (err) {
      next(err)
    }
}