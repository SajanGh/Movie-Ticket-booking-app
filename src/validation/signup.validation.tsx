import { ZodType, z } from "zod";

export type FormData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerSchema: ZodType<FormData> = z
  .object({
    firstName: z
      .string({ required_error: "Firstname is required" })
      .min(3, { message: "Firstname must be of 3 characters" })
      .max(20, { message: "Firstname must be upto 20 characters" })
      .trim(),
    lastName: z
      .string()
      .min(3, { message: "Firstname must be of 3 characters" })
      .max(20, { message: "Lastname must be upto 20 characters" })
      .trim(),
    username: z
      .string({ required_error: "Username is required" })
      .min(3, { message: "Username must be of 3 characters" })
      .max(20, { message: "Username must be upto 20 characters" })
      .trim(),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(8, { message: "Password must be of 8 characters" })
      .max(20, { message: "Password must be upto 20 characters" })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be of 8 characters" })
      .max(20, { message: "Password must be upto 20 characters" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
