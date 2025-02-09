import { Schema,model } from "mongoose";
import { ImageSchema } from "./user.models";
import { IGroup } from "@/types/Group.types";

const GroupSchema = new Schema<IGroup>({
  name: {type: String,required: true},
  admin: {type: Schema.Types.ObjectId,ref:"User",required: true},
  users: {type: [Schema.Types.ObjectId],ref:"User",required: true},
  Image:ImageSchema
});

export const GroupModel = model<IGroup>("Group",GroupSchema);