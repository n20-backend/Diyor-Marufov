import { Router } from "express";
import { reviewController } from "../controller/index.js";

const router = Router();

router.get("/review", reviewController.findALl);
router.get("/review/:id", reviewController.findOne);
router.post("/review", reviewController.create);
router.put("/review/:id", reviewController.update);
router.delete("/review/:id", reviewController.delete);

export { router as reviewRouter };
