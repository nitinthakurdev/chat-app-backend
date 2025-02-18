import { Schema, model } from "mongoose";
import { ImageSchema } from "./user.models";
const GroupSchema = new Schema({
    name: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    users: { type: [Schema.Types.ObjectId], ref: "User", required: true },
    Image: ImageSchema
});
export const GroupModel = model("Group", GroupSchema);
