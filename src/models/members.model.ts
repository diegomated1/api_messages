import { IMembers } from './../interfaces/cassandra_interfaces/IMembers';
import client from '../database/cassandra.db.js';
import { types } from 'cassandra-driver';

class Members{

    private member_columns:string

    constructor() {
        this.member_columns = 'id_user, id_channel, joined';
    }

    find_by_id_user(id_user:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.member_columns} FROM members_by_users WHERE id_user = ?`;
                const query_result = await client.execute(query, [id_user], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    find_by_id_channel(id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.member_columns} FROM members_by_channels WHERE id_channel = ?`;
                const query_result = await client.execute(query, [id_channel], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    find_by_ids(id_user:string,id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.member_columns} FROM members_by_users WHERE id_user = ? AND id_channel = ?`;
                const query_result = await client.execute(query, [id_user,id_channel], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    insert(data:IMembers):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const params = [
                    data.id_user, data.id_channel, data.joined
                ]
                const query = `INSERT INTO members_by_channels(${this.member_columns}) VALUES (?,?,?)`;
                const query_result = await client.execute(query, params, {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    remove_one(id_user:string, id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = 'DELETE FROM members_by_channels WHERE id_channel = ? AND id_user = ?';
                const query_result = await client.execute(query, [id_channel, id_user], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    remove_all(id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = 'DELETE FROM members_by_channels WHERE id_channel = ?';
                const query_result = await client.execute(query, [id_channel], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

}

export default new Members();