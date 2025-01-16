import { z } from "zod";

// User Schema
export const UserSchema = z.object({
  username: z.string().trim().nonempty({ message: "Username is required" }),
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  password: z.string().min(4,{message:"Password must be minimum 4 characters"}).max(12,{message:"Password at least 12 characters"}).nonempty({ message: "Password is required" }),
  refresh_token: z.string().optional(),
});
