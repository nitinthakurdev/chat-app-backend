import { config } from "@/config/env.config";
import  { sign } from "jsonwebtoken";
import { ObjectId } from "mongoose";


export const AccessToken = (id:ObjectId | string,email:string):string => {
    return sign({id,email},config.JWT_TOKEN,{ expiresIn: "1d" });
};

export const RefreshToken = (email:string):string => {
    return sign({email},config.JWT_TOKEN,{ expiresIn: "2d" });
};

