import { config } from "@/config/env.config";
import { findByEmailOrUsername } from "@/services/auth.service";
import { IAuthResponse } from "@/types/auth.types";
import { IVerfifyJWT } from "@/types/types";
import { NotAuthorizedError } from "@/utils/CustomError";
import { NextFunction,Request, Response } from "express";
import { verify } from "jsonwebtoken";


export const Authentication = async (req:Request,_res:Response,next:NextFunction):Promise<void>=>{
    try {
        const data = req.cookies;
        if(!(data.ajt || data.rjt)){
            next(new NotAuthorizedError("Not valid user","Authentication method"));
        };

        const verifyJwt = verify(data.ajt,config.JWT_TOKEN) as IVerfifyJWT;

        const user = await findByEmailOrUsername(verifyJwt.email as string) as IAuthResponse;
        if(!user) {
            next(new NotAuthorizedError("Invalid User please try again","Authentication method"));
        };

        req.currentUser = {
            id:user._id,
            email:user.email,
            username:user.username
        };
        next();
        
    } catch (error) {
         next(new NotAuthorizedError("Invalid User please try again","Authentication method 1"))
    }
   
};