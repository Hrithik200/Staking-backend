import { z } from "zod";

export const transferSchema = z.object({
  from: z.string().min(1, "Sender is required"),
  to: z.string().min(1, "Receiver is required"),
  amount: z.union([
    z.string().regex(/^\d+(\.\d+)?$/, "Amount must be a valid number string"),
    z.number().positive("Amount must be a positive number"),
  ])
});

export const RegisterSchema = z.object({
  userType: z.string().min(1, { message: "User type is required" }),
  address: z
    .string()
    .length(42, { message: "Invalid Ethereum address length. Must be 42 characters." }),
  key: z
    .string()
    .min(64, { message: "Private key must be at least 64 characters" })
    .max(66, { message: "Private key must be at most 66 characters" }),

});
export const mintSchema = z.object({
  from: z.string().min(1, "Sender is required"),
  to: z.string().min(1, "Receiver is required"),
  amount: z.union([
    z.string().regex(/^\d+(\.\d+)?$/, "Amount must be a valid number string"),
    z.number().positive("Amount must be a positive number"),
  ])

});
export const approveSchema = z.object({
  from: z.string().min(1, "Sender is required"),
  amount: z.union([
    z.string().regex(/^\d+(\.\d+)?$/, "Amount must be a valid number string"),
    z.number().positive("Amount must be a positive number"),
  ])

});
