import client from "../database/cassandra.db.js";
import { mapping } from "cassandra-driver";


const channelMapper = new mapping.Mapper(client, {
    models: {
        'Channel': {
            tables: ['channels_by_id', 'channels_by_url'],
            mappings: new mapping.DefaultTableMappings(),
            columns: {
                id_channel: 'id_channel',
                name: 'name',
                create_at: 'create_at',
                custom_url: 'custom_url',
                description: 'description',
                id_creator: 'id_creator'
            }
        }
    }
});
const channelModel = channelMapper.forModel('Channel');

export default channelModel;