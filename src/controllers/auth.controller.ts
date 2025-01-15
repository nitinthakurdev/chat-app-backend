import { findByEmailOrUsername } from "@/services/auth.service";
import { IAuthResponse } from "@/types";
import { AsyncHandler } from "@/utils/asyncHandler";
import { BadRequestError } from "@/utils/CustomError";
import { Request, Response } from "express";

const createUser = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data: IAuthResponse = req.body;

    const user = await findByEmailOrUsername(data.email);
    if (user) {
        throw new BadRequestError("User already exist","createUser methord error")
    }

    res.status(200).json({
        message: "test",
        data
    })
})

export { createUser }