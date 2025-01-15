import { z } from "zod";

// Image Schema
export const ImageSchema = z.object({
  image_Url: z.string().url({ message: "Invalid image URL format" }).nonempty({ message: "Image URL is required" }),
  image_id: z.string().nonempty({ message: "Image ID is required" }),
});

// User Schema
export const UserSchema = z.object({
  username: z.string().trim().nonempty({ message: "Username is required" }),
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
  refresh_token: z.string().optional(),
  profilePic: ImageSchema,
});
