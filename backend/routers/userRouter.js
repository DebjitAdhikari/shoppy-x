import express from "express"
import * as userController from "../controllers/userController.js"
import upload from "../controllers/uploadController.js"

const router = express.Router()
router.route("/signUp")
    .post(userController.createUser)
router.route("/signIn")
    .post(userController.signIn)
router.route("/getAll")
    .get(userController.protectRoute,userController.getAllUsers)
router.route("/:userId")
    .get(userController.getUser)
    .delete(userController.deleteUser)
router.route("/updateMe")
    .post(userController.protectRoute,userController.updateMe)
router.route("/updateMyPassword")
    .post(userController.protectRoute,userController.updateMyPassword)
export default router