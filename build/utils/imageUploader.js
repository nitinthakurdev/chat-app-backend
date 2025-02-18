import { config } from '@/config/env.config';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_SECRET,
});
const UploadOnCloudinary = async (localFilePath, public_id, overwrite, invalidate) => {
    try {
        if (!localFilePath)
            return null;
        const res = await cloudinary.uploader.upload(localFilePath, { public_id, overwrite, invalidate, resource_type: 'auto' });
        const resData = {
            image_Url: res.secure_url,
            image_id: res.public_id,
        };
        return resData;
    }
    catch (err) {
        return null;
    }
};
const DeleteOnCloudinary = async (imageid) => {
    const res = await cloudinary.uploader.destroy(imageid);
    if (res.result !== 'ok') {
        return false;
    }
    return true;
};
export { UploadOnCloudinary, DeleteOnCloudinary };
