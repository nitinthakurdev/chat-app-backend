import { getGroupChat, getUserMessages, sendUserMessage } from '@/controllers/message.controller';
import { Authentication } from '@/middleware/authentication';
import { Router } from 'express';
const routes = Router();
export const MessageRouter = async () => {
    routes.route('/get-messages/:id').get(Authentication, getUserMessages);
    routes.route('/group-messages/:id').get(Authentication, getGroupChat);
    routes.route('/send-messages/:id').post(Authentication, sendUserMessage);
    return routes;
};
