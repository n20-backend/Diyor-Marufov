import { z } from "zod";

// Orders Schema
export const ordersSchema = z.object({
  totalAmount: z.number().positive(),
});

export const ordersUpdateSchema = ordersSchema.partial();
