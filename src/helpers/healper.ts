import { LoginSchema, UserSchema } from '@/validations/user.validation';
import { validater } from './validater.helper';
import { GroupSchema } from '@/validations/group.validation';

// auth validations
export const UserValidation = validater(UserSchema);
export const UserLoginValidation = validater(LoginSchema);


// group validations

export const GroupValidation = validater(GroupSchema);