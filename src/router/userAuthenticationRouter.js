import {Router} from "express"
import { userAuthenticationController } from "../controller/index.js"

const router = Router()

router.get("/auth/me", userAuthenticationController.authCurrentUser)
router.get("/auth/logout", userAuthenticationController.logOut)
router.post("/auth/signup", userAuthenticationController.signUp)
router.post("/auth/verify-otp", userAuthenticationController.verifyOtp)
router.post("/auth/signin", userAuthenticationController.signIn)
router.post("/auth/refresh-token", userAuthenticationController.updateRefreshToken)

export {router as userAuthenticationRouter}

