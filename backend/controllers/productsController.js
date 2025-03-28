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
export async function getAllFeaturedProducts(req,res,next){
    try {
      const products = await Product.find({featuredProduct:true})
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
      console.log(req.body)
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
          const uploadstream = cloudinary.uploader.upload_stream({folder:"ShoppyX/Products/", secure:true},
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
      req.body.featuredProduct= req.body.featuredProduct==="true"
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
      console.log("form data received",req.body)
      const product = await Product.findById(req.params.id)
      if(!product){
        return res.status(400).json({
          status:"failed",
          message:"product not found"
        })
      }
      //1)at first we will delete those image that dont need anymore
      //2)upload the new image and merge with the existing image of products
      const {name,availableSize,category,inStock,imageUrls,description,discount,featuredProduct,features,price} = req.body
      let allProductImages=product.images
      const imagesToBeDeleted= allProductImages.filter(img=>!imageUrls.includes(img.url))
      const imagesToBeStayed = allProductImages.filter(img=>imageUrls.includes(img.url))
      const imagesToBeUploaded = req.files
      // console.log("all images",allProductImages)
      // console.log("stayable images",imagesToBeStayed)
      // console.log("deleteable images",imagesToBeDeleted)
      // console.log("form files received",imagesToBeUploaded)
      //delete the images
      if(imagesToBeDeleted.length>0){
        const deleteImagesPromise = imagesToBeDeleted?.map(img=>cloudinary.uploader.destroy(img.public_id))
         await Promise.all(deleteImagesPromise)       
      }
      //upload new images
      let uploadedImageUrls=[]
      if(imagesToBeUploaded.length>0){
        const uploadImagePromise = imagesToBeUploaded.map(img=>{
          return new Promise((resolve,reject)=>{
            const uploadstream = cloudinary.uploader.upload_stream(
              {folder:"ShoppyX/Products/", secure:true},
              (err,results)=>{
                if(err)
                  reject(new Error("Error uploading image"))
                resolve({url:results.secure_url,public_id:results.public_id})
            })
            uploadstream.end(img.buffer)
          })
        })
        uploadedImageUrls = await Promise.all(uploadImagePromise)
      }
      //merge all products images urls
      allProductImages = [...imagesToBeStayed,...uploadedImageUrls]
      const updateProduct = {
        name,
        availableSize,
        category,
        inStock,
        description,
        discount,
        featuredProduct:featuredProduct==="true",
        features,
        price,
        images: allProductImages
      }
      const updatedProductResult = await Product.findByIdAndUpdate(req.params.id,updateProduct,{
        new:true
      })
      res.status(200).json({
        status:"success",
        data:updatedProductResult
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

//i changed the model so some fields werenot there so i updated the exiting product using this code
// export async function updateExisting(req,res,next) {
//   try {
//     const data = await Product.updateMany({ featuredProduct: { $exists: false } }, { $set: { featuredProduct: false } });
//     console.log("All existing products updated successfully!");
//     res.status(200).json({
//       status:"success",
//       data
//     })
// } catch (error) {
//     console.error("Error updating products:", error);
// }
// }