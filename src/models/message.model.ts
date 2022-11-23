import { IMessage } from "interfaces/cassandra_interfaces/IMessage";
import { IErr_data, IErr_msg } from "interfaces/others/IPromise_response";
import client from "../database/cassandra.db.js";
import {Client, types} from 'cassandra-driver';
import { mapping } from "cassandra-driver";


const messagesMapper = new mapping.Mapper(client, {
    models: {
        'Messages': {
            tables: ['messages_by_id', 'messages_by_channel'],
            mappings: new mapping.DefaultTableMappings(),
            columns: {
                id_message: 'id_message',
                id_channel: 'id_channel',
                create_at: 'create_at',
                content: 'content',
                id_author: 'id_author'
            }
        }
    }
});
const messageModel = messagesMapper.forModel('Messages');

export default messageModel;