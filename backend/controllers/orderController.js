import Order from "../models/orderModel.js";

export async function createOrder(req,res,next){
    try {
        const user = req.user
        const {products,orderPrice,orderStatus} = req.body
        // console.log(req.body)
        // console.log(user)
        console.log(products)
        if(products.length===0||!orderPrice||!orderStatus)
            return res.status(400).json({
                status:"failed",
                message:"Fields are required"
            })
        const newOrder={
            user:user._id,
            products,
            orderPrice,
            orderStatus
        }
        const order= await Order.create(newOrder)
        user.orders.push(order._id)
        await user.save()
        res.status(200).json({
            status:"success",
            data:order
        })
    
    } catch (err) {
        next(err)
    }
}
export async function getAllUserOrders(req,res,next){
    try {
        const user = req.user
        // const orders= await Order.find({user:user._id}).populate("user","name contactNo address")
        const orders= await Order.find({user:user._id})
        if(!orders)
            return res.status(400).json({
                status:"failed",
                message:"No orders found"
            })
        res.status(200).json({
            status:"success",
            data:orders
            // data:{
            //     user:{
            //         name:user.name,
            //         contactNo:user.contactNo,
            //         adress:user.address
            //     },
            //     orders
            // }
        })
    
    } catch (err) {
        next(err)
    }
}
export async function getOrdersByOrderId(req,res,next){
    try {
        const user = req.user
        const {orderId}=req.params
        const order= await Order.find({orderId:orderId})
        if(!order)
            return res.status(400).json({
                status:"failed",
                message:"No orders found"
            })
        res.status(200).json({
            status:"success",
            data:{
                user:{
                    name:user.name,
                    contactNo:user.contactNo,
                    address:user.address
                },
                order
            }
        })
    
    } catch (err) {
        next(err)
    }
}
