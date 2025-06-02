import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import {verifyJWT} from '../middlewares/jwtAuth.middleware.js'
import { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
 } from "../controllers/user.controller.js";

const router = Router()

// router.route("/test").get(testing)
router.route("/register").post(upload.single('avatar'), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-accToken").post(refreshAccessToken)



export default router