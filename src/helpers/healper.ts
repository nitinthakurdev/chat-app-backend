import { UserSchema } from "@/validations/user.validation";
import { validater } from "./validater.helper";


export const UserValidation = validater(UserSchema);