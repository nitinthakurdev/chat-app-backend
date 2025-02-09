import { z } from "zod";

export const GroupSchema = z.object({
    name: z.string().trim().nonempty({ message: 'Group name is required' }),
    admin: z.string().nonempty({ message: 'Admin is required' }),
    users: z.array(z.string()).nonempty({ message: 'Users is required' }),
    Image: z.object({
        url: z.string().nonempty({ message: 'Image url is required' }),
        public_id: z.string().nonempty({ message: 'Image public_id is required' }),
    }).optional(),
})