import { config } from '@/config/env.config';
import { sign } from 'jsonwebtoken';
export const AccessToken = (data) => {
    return sign(data, config.JWT_TOKEN, { expiresIn: '1d' });
};
export const RefreshToken = (data) => {
    return sign(data, config.JWT_TOKEN, { expiresIn: '2d' });
};
