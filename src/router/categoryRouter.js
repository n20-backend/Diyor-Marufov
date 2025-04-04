import { Router } from "express";
import { categoryController } from "../controller/index.js";

const router = Router();

router.get("/category", categoryController.findALl);
router.get("/category/:id", categoryController.findOne);
router.post("/category", categoryController.create);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

export { router as categoryRouter };
