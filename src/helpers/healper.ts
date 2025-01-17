import { LoginSchema, UserSchema } from "@/validations/user.validation";
import { validater } from "./validater.helper";


// auth validations 
export const UserValidation = validater(UserSchema);
export const UserLoginValidation = validater(LoginSchema);
