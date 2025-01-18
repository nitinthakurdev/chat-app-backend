import { ObjectId } from "mongoose";
import { ICurrentUser } from "@/types/types";

declare global {
    namespace Express {
      interface Request {
        currentUser?:ICurrentUser
      }
    }
  }
