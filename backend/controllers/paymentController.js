import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export async function createStripeCheckoutSession(req,res,next){
    try {
       const {products,totalPrice}=req.body
       const session = await 
    } catch (err) {
    
    }
}