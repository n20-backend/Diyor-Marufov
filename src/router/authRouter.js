import { Router } from "express";
import { authController } from "../controller/index.js";
import { authUser, signInUser } from "../validator/index.js";
import { validate } from "../utils/index.js";

const router = Router();

router.post("/auth/signup", validate(authUser), authController.signUp);
router.post("/auth/signin", validate(signInUser), authController.signIn);
router.post("/auth/me", authController.currentUser);
router.get("/auth/logout", authController.logOut);
router.get("/auth/refresh-token", authController.updateRefreshToken);

export { router as authRouter };
