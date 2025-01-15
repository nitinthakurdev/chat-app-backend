import { config } from '@/config/env.config';
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_SECRET
});

const UploadOnCloudinary = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null
        const res = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
        return res
    } catch (err) {
        fs.unlinkSync(localFilePath)
        return null
    }
}


const DeleteOnCloudinary = async (imageid: string) => {
    const res = await cloudinary.uploader.destroy(imageid)
    return res
}
export { UploadOnCloudinary, DeleteOnCloudinary }