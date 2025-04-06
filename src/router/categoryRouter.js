import { Router } from "express";
import { categoryController } from "../controller/index.js";
import { categoryVMID } from "../middleware/index.js";

const router = Router();

router.get("/category", categoryController.findALl);
router.get("/category/:id", categoryController.findOne);
router.post("/category", categoryVMID.category, categoryController.create);
router.put(
  "/category/:id",
  categoryVMID.categoryUpdate,
  categoryController.update
);
router.delete("/category/:id", categoryController.delete);

export { router as categoryRouter };
