import client from "../database/cassandra.db.js";
import { mapping } from "cassandra-driver";

const channelUsersMapper = new mapping.Mapper(client, {
    models: {
        'Channel': {
            tables: ['channels_by_users', 'users_channels'],
            mappings: new mapping.DefaultTableMappings(),
            columns: {
                id_channel: 'id_channel',
                id_user: 'id_user',
                custom_username: 'custom_username',
                joined: 'joined',
                username: 'username'
            }
        }
    }
});
const channelUserModel = channelUsersMapper.forModel('Channel');

export default channelUserModel;