import { createGroup, getGroupByAdminAndName, getGroupById } from "@/services/group.service";
import { AsyncHandler } from "@/utils/asyncHandler";
import { BadRequestError } from "@/utils/CustomError";
import { UploadOnCloudinary } from "@/utils/imageUploader";
import { StatusCodes } from "http-status-codes";
const CreateGroup = AsyncHandler(async (req, res) => {
    const data = req.body;
    const check = await getGroupByAdminAndName(req.currentUser?.id, data.name);
    if (check)
        throw new BadRequestError('Group already exists', 'CreateGroup method');
    const Image = await UploadOnCloudinary(data.image, '', true, true);
    const result = await createGroup({ ...data, admin: req.currentUser?.id, Image });
    res.status(StatusCodes.OK).json({
        message: "Group created successfully",
        result
    });
});
const GetGroup = AsyncHandler(async (req, res) => {
    const data = await getGroupById(req.currentUser?.id);
    res.status(StatusCodes.OK).json({
        data
    });
});
export { CreateGroup, GetGroup };
