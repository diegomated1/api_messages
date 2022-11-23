import messageController from "../controllers/message.controller.js";
import { Router } from "express";

const msg_router = Router();

msg_router.route('/channel/:id_channel/messages').get(messageController.get_messages_in_channel);
msg_router.route('/channel/:id_channel/messages').post(messageController.create_message);
msg_router.route('/channel/:id_channel/messages/:id_message').get(messageController.get_message_by_id);
msg_router.route('/channel/:id_channel/messages/:id_message').put(messageController.update_message_content);
msg_router.route('/channel/:id_channel/messages/:id_message').delete(messageController.delete_message);

export default msg_router;
