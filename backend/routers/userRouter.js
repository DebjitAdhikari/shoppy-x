import express from "express"

const router = express.Router()
router.route("/getAll").get((req,res,next)=>{
    res.json({
        message: "this is user router"
    })
})

export default router