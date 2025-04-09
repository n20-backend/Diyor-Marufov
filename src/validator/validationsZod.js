import { z } from "zod";

// Category Schema
export const categorySchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
});

export const categoryUpdateSchema = categorySchema.partial();

// Order Detail Schema
export const orderDetailSchema = z.object({
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  totalPrice: z.number().positive(),
});

export const orderDetailUpdateSchema = orderDetailSchema.partial();

// Orders Schema
export const ordersSchema = z.object({
  totalAmount: z.number().positive(),
});

export const ordersUpdateSchema = ordersSchema.partial();

// Payment Schema
export const paymentSchema = z.object({
  amount: z.number().positive(),
  method: z.enum(["credit_card", "paypal", "bank_transfer"]),
  status: z.enum(["pending", "completed", "failed"]),
});

export const paymentUpdateSchema = paymentSchema.partial();

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

// Review Schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(10),
  comment: z.string().min(3),
  status: z.enum(["approved", "pending", "rejected"]),
});

export const reviewUpdateSchema = reviewSchema.partial();

// User Schema
export const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(4),
  role: z.enum(["customer", "seller", "admin"]),
  status: z.enum(["active", "inactive"]),
});

export const userUpdateSchema = userSchema.partial();

// authUser Schema
export const authUser = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
  role: z.enum(["customer", "seller", "admin"]),
  firstName: z.string().min(3),
  lastName: z.string().min(5)
})

export const signInUser = authUser.partial()
