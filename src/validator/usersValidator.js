import { z } from "zod";

// User Schema
export const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(4),
  role: z.enum(["customer", "seller", "admin"]),
  status: z.enum(["active", "inactive"]),
});

export const userUpdateSchema = userSchema.partial();
