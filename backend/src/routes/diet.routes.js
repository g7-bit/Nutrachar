import { Router } from "express";
import { verifyJWT } from "../middlewares/jwtAuth.middleware.js";
import {upload} from '../middlewares/multer.middleware.js'

import {
    createDiet,
    getAllDiets,
    getSingleDiet
} from '../controllers/diet.controller.js'

const router = Router()

router.route("/newDiet").post(upload.array('foodImage'),verifyJWT,createDiet)
router.route("/getAllDiets").get(verifyJWT,getAllDiets)
router.route("/getSingleDiet/:dietId").get(getSingleDiet)


export default router