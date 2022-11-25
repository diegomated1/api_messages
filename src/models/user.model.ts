import client from "../database/cassandra.db.js";
import { mapping } from "cassandra-driver";

const userMapper = new mapping.Mapper(client, {
    models: {
        'Users': {
            tables: ['users_by_id', 'users_by_email', 'users_by_username'],
            mappings: new mapping.DefaultTableMappings(),
            columns: {
                id_user: 'id_user',
                username: 'username',
                custom_username: 'custom_username',
                email: 'email',
                password: 'password'
            }
        }
    }
});
const userModel = userMapper.forModel('Users');

export default userModel;