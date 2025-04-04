import express from "express";
import cors from "cors";

import { errorHandler } from "./middleware/index.js";
import {
  categoryRouter,
  orderDetailRouter,
  ordersRouter,
  paymentRouter,
  productRouter,
  reviewRouter,
  usersRouter,
} from "./router/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);

const router = [
  categoryRouter,
  orderDetailRouter,
  ordersRouter,
  paymentRouter,
  productRouter,
  reviewRouter,
  usersRouter,
];

app.use("/commerce", ...router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
