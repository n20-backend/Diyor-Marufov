import { Router } from "express";
import { productController } from "../controller/index.js";
import { productVMID } from "../middleware/index.js";

const router = Router();

router.get("/product", productController.findALl);
router.get("/product/:id", productController.findOne);
router.post("/product", productVMID.product, productController.create);
router.put("/product/:id", productVMID.productUpdate, productController.update);
router.delete("/product/:id", productController.delete);

export { router as productRouter };
