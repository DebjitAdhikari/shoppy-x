import Cupon from "../models/cuponModel.js"

export async function createCupon(req,res,next){
    try {
      const {title,discountPrice} = req.body
    //   console.log(req.body)
      if(!title || !discountPrice)
        return res.status(400).json({
            status:"failed",
            message:"Fields are required"
        })
        const cupon = await Cupon.create({title,discountPrice})
        res.status(200).json({
            status:"success",
            message:"Cupon created successfully",
            data:cupon
        })
    } catch (err) {
        next(err)
    }
}
export async function getAllCupons(req,res,next){
    try {
        const cupon = await Cupon.find()
        if(!cupon)
            return res.status(400).json({
                status:"failed",
                message:"No cupons found"
            })
        res.status(200).json({
            status:"success",
            data:cupon
        })
    } catch (err) {
        next(err)
    }
}
export async function updateCupon(req,res,next){
    try {
        const {cuponId} = req.params
        // const {title,discountPrice} = req.body
        // if(!title || !discountPrice)
        //     return res.status(400).json({
        //         status:"failed",
        //         message:"Fields are required"
        //     })
        
        const cupon = await Cupon.findByIdAndUpdate(cuponId,req.body,{
            new:true,
        })
        if(!cupon)
            return res.status(400).json({
                status:"failed",
                message:"Cupon not found"
            })
        res.status(200).json({
            status:"success",
            message:"Cupon updated successfully",
            data:cupon
        })
    } catch (err) {
        next(err)
    }
}
export async function deleteCupon(req,res,next){
    try {
        const {cuponId} = req.params
        const cupon = await Cupon.findByIdAndDelete(cuponId)
        if(!cupon)
            return res.status(400).json({
                status:"failed",
                message:"Cupon not found"
            })
        res.status(200).json({
            status:"success",
            message:"Cupon deleted successfully",
            data:null
        })
    } catch (err) {
        next(err)
    }
}