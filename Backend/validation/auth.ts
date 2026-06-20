import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name is too long"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name is too long"),

  email: z.email("Invalid email address").trim().toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain uppercase, lowercase and a number",
    ),

  role: z.enum(["staff", "admin"]).default("admin"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),

  password: z.string().min(1, "Password is required"),
});

export const forgetPassSchema = z.object({
  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,

      "Password must contain uppercase, lowercase and a number",
    ),
});


export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain uppercase, lowercase and a number"
      ),

    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });