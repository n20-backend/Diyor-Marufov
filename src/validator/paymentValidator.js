import { z } from "zod";

// Payment Schema
export const paymentSchema = z.object({
  amount: z.number().positive(),
  method: z.enum(["credit_card", "paypal", "bank_transfer"]),
  status: z.enum(["pending", "completed", "failed"]),
});

export const paymentUpdateSchema = paymentSchema.partial();
