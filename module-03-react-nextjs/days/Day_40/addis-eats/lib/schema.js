import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Please enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z.string().trim().regex(/^09\d{8}$/, "Enter a valid Ethiopian phone number"),
  location: z.string().trim().min(3, "Location is required"),
  paymentMethod: z.enum(["cash", "telebirr", "bank-transfer"], {
    error: "Select a valid payment method",
  }),
  items: z
    .array(
      z.object({
        id: z.string().min(1, "Choose a valid dish"),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1, "Add at least one dish to your order")
    .max(20, "An order can contain at most 20 different dishes"),
});

export const dishSchema = z.object({
  name: z.string().trim().min(2, "Dish name is required"),
  category: z.string().trim().min(2, "Category is required"),
  description: z.string().trim().min(10, "Description is required"),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a positive number" })
    .positive("Price must be a positive number"),
  image: z
    .string()
    .trim()
    .min(1, "Image path is required")
    .refine((value) => /^\//.test(value) || /^https?:\/\//.test(value), "Image path should be a valid URL or / path."),
  available: z.boolean().optional().default(true),
});

export const orderStatusSchema = z.enum([
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
], {
  error: "Status is invalid",
});
