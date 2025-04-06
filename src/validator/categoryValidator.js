import { z } from "zod";

// Category Schema
export const categorySchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
});

export const categoryUpdateSchema = categorySchema.partial();
