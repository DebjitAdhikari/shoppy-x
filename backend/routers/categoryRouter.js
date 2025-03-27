import express from "express"
import * as categoryController  from "../controllers/categoryController.js"
import upload from "../controllers/uploadController.js"
const router = express.Router()
router.route("/create")
    .post(upload.single("image"),categoryController.createCategory)
router.route("/getAll")
    .get(categoryController.getAllCategories)
router.route("/:id")
    .patch(upload.single("image"),categoryController.updateCategory)

export default router