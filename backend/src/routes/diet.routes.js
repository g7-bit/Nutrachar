import { Router } from "express";
import { verifyJWT } from "../middlewares/jwtAuth.middleware.js";
import {upload} from '../middlewares/multer.middleware.js'

import {
    createDiet
} from '../controllers/diet.controller.js'

const router = Router()

router.route("/newDiet").post(upload.array('foodImage'),verifyJWT,createDiet)


export default router