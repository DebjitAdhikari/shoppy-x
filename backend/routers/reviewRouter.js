import express from "express"
import * as reviewController from "../controllers/reviewController.js"
import upload from "../controllers/uploadController.js"
const router = express.Router()

router.route("/create")
    .post(upload.fields([{name:"images"},{name:"videos"}]),reviewController.createReview)
router.route("/getAll")
    .get(reviewController.getAllReviews)
router.route("/:id")
    .get(reviewController.getReview)
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview)

export default router