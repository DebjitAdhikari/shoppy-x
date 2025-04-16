import express from "express"
import upload from "../controllers/uploadController.js"
import * as userController from "../controllers/userController.js"
import * as orderController from "../controllers/orderController.js"
const router = express.Router()
router.route("/create")
    .post(userController.protectRoute,orderController.createOrder)
router.route("/getAll")
    .get(orderController.getAllOrders)
router.route("/getUserOrders")
    .get(userController.protectRoute,orderController.getAllUserOrders)
router.route("/:orderId")
    .get(userController.protectRoute,orderController.getOrdersByOrderId)
//     .delete(offerController.deleteOffer)
export default router