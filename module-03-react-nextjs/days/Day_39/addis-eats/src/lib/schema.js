import { z } from "zod";

const itemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  customerName: z.string().trim().min(2, "Customer name is required"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+251|0)9\d{8}$/, "Use a valid Ethiopian phone number"),
  deliveryLocation: z.string().trim().min(2, "Delivery location is required"),
  paymentMethod: z.enum(["Cash on Delivery", "Mobile Money", "Card"]),
  notes: z.string().trim().max(300, "Notes must be 300 characters or fewer").optional().default(""),
  items: z.array(itemSchema).min(1, "Add at least one dish to your order"),
  total: z.number().nonnegative(),
});
