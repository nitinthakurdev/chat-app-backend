import { Request, Response } from "express";

const createUser = async (req:Request,res:Response):Promise<void>=>{
    const data = req.body;
     res.status(200).json({
        message:"test",
        data
    })
}

export {createUser}