import { config } from '../config/env.config';
import { findByEmailOrUsername } from '../services/auth.service';
import { NotAuthorizedError } from '../utils/CustomError';
import { verify } from 'jsonwebtoken';
export const Authentication = async (req, _res, next) => {
    try {
        const data = req.cookies;
        if (!(data.ajt || data.rjt)) {
            next(new NotAuthorizedError('Not valid user', 'Authentication method'));
        }
        const verifyJwt = verify(data.ajt, config.JWT_TOKEN);
        const user = (await findByEmailOrUsername(verifyJwt.email));
        if (!user) {
            next(new NotAuthorizedError('Invalid User please try again', 'Authentication method'));
        }
        req.currentUser = {
            id: user._id,
            email: user.email,
            username: user.username,
        };
        next();
    }
    catch (error) {
        next(new NotAuthorizedError('Invalid User please try again', 'Authentication method 1'));
    }
};
