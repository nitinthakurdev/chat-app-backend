import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
export const ImageSchema = new Schema({
    image_Url: { type: String, required: true },
    image_id: { type: String, required: true },
});
const UserSchema = new Schema({
    username: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    refresh_token: { type: String },
    profilePic: ImageSchema,
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    user.password = await bcrypt.hash(user.password, 12);
    next();
});
export const UserModel = model('User', UserSchema);
