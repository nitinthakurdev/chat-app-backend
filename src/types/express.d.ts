import { ObjectId } from "mongoose";

declare global {
    namespace Express {
      interface Request {
        currentUser?: {
            id:ObjectId
        };
      }
    }
  }
