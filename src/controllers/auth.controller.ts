import { findByEmailOrUsername } from "@/services/auth.service";
import { AsyncHandler } from "@/utils/asyncHandler";
import { BadRequestError, NotFoundError } from "@/utils/CustomError";
import {  UploadOnCloudinary } from "@/utils/imageUploader";
import { Request, Response } from "express";

const createUser = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const file = req.file;

    if (!file) {
        throw new NotFoundError("file not found", "create user Method");
    };

    const user = await findByEmailOrUsername(data.email);
    if (user) {
        throw new BadRequestError("User already exist", "createUser methord error")
    }

    await UploadOnCloudinary(file?.path as string);


    
    
    res.status(200).json({
        message: "test",
        data
    })
})

export { createUser }