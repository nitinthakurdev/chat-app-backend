import { config } from "@/config/env.config";
import { IVerfifyJWT } from "@/types/types";
import  { sign } from "jsonwebtoken";


export const AccessToken = (data:IVerfifyJWT):string => {
    return sign(data,config.JWT_TOKEN,{ expiresIn: "1d" });
};

export const RefreshToken = (data:IVerfifyJWT):string => {
    return sign(data,config.JWT_TOKEN,{ expiresIn: "2d" });
};

