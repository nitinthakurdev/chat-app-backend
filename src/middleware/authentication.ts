import { AsyncHandler } from "@/utils/asyncHandler";
import { NextFunction, request, Request, Response } from "express";


export const Authentication = AsyncHandler(async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const data = req.cookies()
})