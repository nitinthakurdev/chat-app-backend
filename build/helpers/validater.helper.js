import { StatusCodes } from 'http-status-codes';
export const validater = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const validate = await schema.safeParseAsync(data);
            if (!validate.success) {
                const errors = validate.error.errors.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message,
                }));
                res.status(StatusCodes.BAD_REQUEST).json({
                    errors,
                });
                return;
            }
            next();
        }
        catch (error) {
            res.status(StatusCodes.FORBIDDEN).json({
                messgae: 'something went wrong',
                commingFrom: 'validater helper file',
            });
        }
    };
};
