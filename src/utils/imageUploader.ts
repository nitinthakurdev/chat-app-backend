import { config } from '@/config/env.config';
import { IImageSchema } from '@/types';
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_SECRET
});

const UploadOnCloudinary = async (localFilePath: string):Promise<IImageSchema | null> => {
    try {
        if (!localFilePath) return null
        const res = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
        const resData:IImageSchema = {
            image_Url:res.secure_url,
            image_id:res.public_id,
        }
        fs.unlinkSync(localFilePath)
        return resData
    } catch (err) {
        fs.unlinkSync(localFilePath)
        return null
    }
}


const DeleteOnCloudinary = async (imageid: string):Promise<boolean> => {
    const res = await cloudinary.uploader.destroy(imageid)
    if(res.result !== "ok"){
        return false
    }
    return true
}
export { UploadOnCloudinary, DeleteOnCloudinary }