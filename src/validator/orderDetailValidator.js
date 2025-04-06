import { z } from "zod";

// Order Detail Schema
export const orderDetailSchema = z.object({
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  totalPrice: z.number().positive(),
});

export const orderDetailUpdateSchema = orderDetailSchema.partial();
