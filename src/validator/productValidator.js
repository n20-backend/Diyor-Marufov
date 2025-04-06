import { z } from "zod";

// Product Schema
export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
  price: z.number().positive(),
  currency: z.enum(["USD", "EUR", "UZS"]),
  stockQuantity: z.number().positive(),
  imageUrl: z.string().url(),
});

export const productUpdateSchema = productSchema.partial();
