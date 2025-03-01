import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";


export async function createReview(req,res,next) {
    try {
        const { userName, userId, rating, description, productId } = req.body
        if (!userName  || !rating || !description || !productId) {
            return res.status(400).json({ status: "failed", message: "All fields are required" });
        }

        const product = await Product.findById(productId)
        if(!product)
            return res.status(400).json({
                status:"failed",
                message:"Product not found"
            })
        //uploading images
        const imageUploadPromises=req.files.images?.map((file)=>{
            return new Promise((resolve,reject)=>{
                const uploadstream = cloudinary.uploader.upload_stream(
                    {folder:"ShoppyX/Reviews/Images"},
                    (err,results)=>{
                        if(err)
                            return reject(new Error("Went wrong while uploading review images"))
                        resolve({url:results.secure_url,public_id:results.public_id})
                    }
                )
                uploadstream.end(file.buffer)
            })
        })
        //uploading videos
        const videoUploadPromises = req.files.videos?.map((file)=>{
            return new Promise((resolve,reject)=>{
                const uploadstream = cloudinary.uploader.upload_stream(
                    {
                        folder:"ShoppyX/Reviews/Videos",
                        resource_type:"video"
                    },
                    (err,results)=>{
                        if(err)
                            return reject(new Error("Went wrong while uploading review videos"))
                        resolve({url:results.secure_url,public_id:results.public_id})
                    }
                )
                uploadstream.end(file.buffer)
            })
        })

        const imageUrls = await Promise.all(imageUploadPromises||[])
        const videoUrls = await Promise.all(videoUploadPromises||[])

        const newReview = await Review.create({
            userName,
            userId,
            rating,
            description,
            productId,
            images:imageUrls,
            videos:videoUrls
        })
        product.reviews.push(newReview._id)
        await product.save()
        res.status(201).json({
            message:"success",
            data:newReview
        })

    } catch (err) {
        next(err)
    }
}
export async function getReview(req,res,next) {
    try {
        const data = await Review.find({})

        res.status(201).json({
            message:"success",
            data
        })

    } catch (err) {
        next(err)
    }
}