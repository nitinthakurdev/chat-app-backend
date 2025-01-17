import { config } from "@/config/env.config";
import { findByEmailOrUsername } from "@/services/auth.service";
import { AsyncHandler } from "@/utils/asyncHandler";
import { BadRequestError } from "@/utils/CustomError";
import { NextFunction,Request, Response } from "express";
import { verify } from "jsonwebtoken";


export const Authentication = AsyncHandler(async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const data = req.cookies;
    if(!(data.ajt || data.rjt)){
        throw new BadRequestError("Not valid user","Authentication method")
    }
    const verifyJwt = verify(data.ajt,config.JWT_TOKEN);
    console.log(verifyJwt.email)
    // const user = await findByEmailOrUsername(verifyJwt.email)
})