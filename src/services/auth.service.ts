import { UserModel } from "@/models/user.models"
import { IAuthResponse } from "@/types"

export const findByEmailOrUsername = async (value:string):Promise<IAuthResponse | null> => {
    const data:IAuthResponse | null = await UserModel.findOne({$or:[
        {email:value},
        {username:value}
    ]}).exec() as IAuthResponse
    return data
}

