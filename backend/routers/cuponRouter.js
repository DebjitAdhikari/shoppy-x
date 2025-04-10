import express from "express"
import * as cuponController from "../controllers/cuponController.js"
const router = express.Router()
router.route("/create")
    .post(cuponController.createCupon)
router.route("/getAll")
    .get(cuponController.getAllCupons)
router.route("/:cuponId")
    .patch(cuponController.updateCupon)
    .delete(cuponController.deleteCupon)
export default router