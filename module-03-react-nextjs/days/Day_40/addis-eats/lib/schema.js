import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^09\d{8}$/, "Enter a valid Ethiopian phone number"),
  location: z.string().trim().min(3, "Location is required"),
  paymentMethod: z.enum(["cash", "telebirr", "bank-transfer"], {
    error: "Select a valid payment method",
  }),
  items: z.array(
    z.object({
      id: z.string().min(1, "Choose a valid dish"),
      quantity: z.number().int().min(1).max(20),
    }),
  ).min(1, "Add at least one dish to your order").max(20, "An order can contain at most 20 different dishes"),
});
