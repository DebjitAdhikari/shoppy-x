import express from "express"
import * as productsController from "../controllers/productsController.js"
import upload from "../controllers/uploadController.js"
const router = express.Router()

router.route("/getAll")
    .get(productsController.getAllProducts)
router.route("/getAllFeaturedProducts")
    .get(productsController.getAllFeaturedProducts)
router.route("/create")
    .post(upload.array("images",5),productsController.createProduct)
router.route("/deleteAll")
    .delete(productsController.deleteAllProduct)

// router.route("/featuredUpdate")
//     .patch(productsController.updateExisting)
router.route("/:id")
    .get(productsController.getProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)

export default router