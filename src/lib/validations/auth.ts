import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
