import Product from "../models/productModel.js"
import cloudinary from "../config/cloudinary.js"
export async function getAllProducts(req,res,next){
    try {
      const products = await Product.find({})
      res.status(200).json({
        status:"success",
        data:products
      })
    } catch (err) {
      
      next(err)       
    }
}
export async function createProduct(req,res,next){
    try {
      // console.log(req.body)
      // console.log(req.files)
      if(!req.files || req.files.length===0)
        return res.status(400).json({
          status:"failed",
          message:"At least one image required"
        })
      if(req.files.length>5)
        return res.status(400).json({
          status:"failed",
          message:"Maximum 5 images can be uploaded"
        })
      const imageUploadPromises = req.files.map((file)=>{
        return new Promise((resolve,reject)=>{
          const uploadstream = cloudinary.uploader.upload_stream({folder:"shoppyX-products"},
            (error,results)=>{
              if(error)
                return reject(new Error("Something went wrong while uploading"))
              return resolve({url:results.secure_url,public_id:results.public_id})
            }
          )
          uploadstream.end(file.buffer)
        })
      })
      const imageUrls = await Promise.all(imageUploadPromises)
      // console.log(imageUrls)
      const products = await Product.create({...req.body,images:imageUrls})
      res.status(200).json({
        status:"success",
        data:products
      })
    } catch (err) {
      next(err)       
    }
}
export async function getProduct(req,res,next){
    try {
      
      const product = await Product.findById(req.params.id).populate("reviews")
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
export async function deleteProduct(req,res,next){
    try {
      
      const product = await Product.findById(req.params.id)
      if(!product) 
        return res.status(404).json({
          status:"failed",
          message:"Product with that id could not be found!"
        }) 
      const deleteImagesProduct = product.images.map(img=>cloudinary.uploader.destroy(img.public_id))
      await Promise.all(deleteImagesProduct)
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json({
        status:"success",
        data:null
      })
    } catch (err) {
      next(err)    
    }
}
export async function updateProduct(req,res,next){
    try {
      
      const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
      })
      if(!product) 
        return res.status(404).json({
          status:"failed",
          message:"Product with that id could not be found!"
        }) 
      res.status(200).json({
        status:"success",
        data:product
      })
    } catch (err) {      
      next(err)
    }
}
export async function deleteAllProduct(req,res,next){
    try {
      
      await Product.deleteMany({})
      
      res.status(200).json({
        status:"success",
        data:null
      })
    } catch (err) {      
      next(err)
    }
}