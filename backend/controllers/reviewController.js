import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";


export async function createReview(req,res,next) {
    try {
        const { rating, description, productId } = req.body
        const userId = req.user._id
        if (!userId  || !rating || !description || !productId) {
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
                    {folder:"ShoppyX/Reviews/Images", secure:true},
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
                        folder:"ShoppyX/Reviews/Videos", secure:true,
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
        console.log(imageUrls,videoUrls)
        const newReview = await Review.create({
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
            status:"success",
            data:newReview
        })

    } catch (err) {
        next(err)
    }
}
export async function getAllReviews(req,res,next) {
    try {
        const reviews = await Review.find({})        
        res.status(201).json({
            status:"success",
            data:reviews
        })
    } catch (err) {
        next(err)
    }
}
export async function hasReviewed(req,res,next) {
    try {
        const userId = req.user._id
        console.log(userId)
        const {productId} = req.params
        console.log(productId)
        if(!userId || !productId)
            return res.status(400).json({
                status:"failed",
                message:"all fields are required"
            })
        const review = await Review.findOne({userId,productId})    
        if(review)
            return res.status(200).json({
                status:"failed",
                message:"You already reviewed this product"
            })    
        res.status(201).json({
            status:"success",
            message:"You can review",
            data:true
        })
    } catch (err) {
        next(err)
    }
}
export async function getReview(req,res,next) {
    try {
        const review = await Review.findById(req.params.id)    
        if(!review) 
            return res.status(400).json({
                status:"failed",
                message:"Review not found"
            })    
        res.status(201).json({
            message:"success",
            data:review
        })
    } catch (err) {
        next(err)
    }
}
export async function getReviewsByProductId(req,res,next) {
    try {
        const {productId} = req.params
        const reviews = await Review.find({productId}).populate("userId","name").select("-__v")    
        if(!reviews) 
            return res.status(400).json({
                status:"failed",
                message:"No reviews for this product found"
            })    
        res.status(201).json({
            message:"success",
            data:reviews
        })
    } catch (err) {
        next(err)
    }
}
export async function updateReview(req,res,next) {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })    
        if(!review) 
            return res.status(400).json({
                status:"failed",
                message:"Review not found"
            })    
        res.status(201).json({
            message:"success",
            data:review
        })
    } catch (err) {
        next(err)
    }
}
export async function deleteReview(req,res,next) {
    try {
        const review = await Review.findById(req.params.id) 
        if(!review) 
            return res.status(400).json({
                status:"failed",
                message:"Review not found"
            })   
        const reviewImages = review.images?.map(img=>cloudinary.uploader.destroy(img.public_id)) 
        const reviewVideos = review.videos?.map(video=>
            cloudinary.uploader.destroy(video.public_id,{resource_type:"video"}))
            
        await Promise.all(reviewImages||[])
        await Promise.all(reviewVideos||[])
        await Review.findByIdAndDelete(review._id)
        res.status(201).json({
            message:"success",
            data:null
        })
    } catch (err) {
        next(err)
    }
}