import { z } from "zod";

// Review Schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(10),
  comment: z.string().min(3),
  status: z.enum(["approved", "pending", "rejected"]),
});

export const reviewUpdateSchema = reviewSchema.partial();
