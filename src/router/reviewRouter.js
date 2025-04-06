import { Router } from "express";
import { reviewController } from "../controller/index.js";
import { reviewVMID } from "../middleware/index.js";

const router = Router();

router.get("/review", reviewController.findALl);
router.get("/review/:id", reviewController.findOne);
router.post("/review", reviewVMID.review, reviewController.create);
router.put("/review/:id", reviewVMID.reviewUpdate, reviewController.update);
router.delete("/review/:id", reviewController.delete);

export { router as reviewRouter };
