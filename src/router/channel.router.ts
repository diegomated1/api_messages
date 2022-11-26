import channelController from "../controllers/channel.controller.js";
import { Router } from "express";

const channel_router = Router();

channel_router.route('/').get(channelController.get_channel_by_url);
channel_router.route('/').post(channelController.create_channel);
channel_router.route('/:id_channel').get(channelController.get_channel_by_id);
channel_router.route('/:id_channel').put(channelController.change_channel_url);
channel_router.route('/:id_channel/users').get(channelController.get_channel_users);
channel_router.route('/:id_channel/join').post(channelController.channel_user_join);
channel_router.route('/:id_channel/leave').delete(channelController.channel_user_leave);


export default channel_router;
