import { IChannel } from './../interfaces/cassandra_interfaces/IChannel';
import client from "../database/cassandra.db.js";
import { types } from "cassandra-driver";


class Channel{

    private channel_columns:string

    constructor() {
        this.channel_columns = 'id_channel, name, create_at, custom_url, description, id_creator';
    }

    find_by_id(id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.channel_columns} FROM channels_by_id WHERE id_channel = ?`;
                const query_result = await client.execute(query, [id_channel]);
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    find_by_url(custom_url:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.channel_columns} FROM channels_by_url WHERE custom_url = ?`;
                const query_result = await client.execute(query, [custom_url]);
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    insert(data:IChannel):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const params = [
                    data.id_channel, data.name, data.create_at, data.custom_url,
                    data.description, data.id_creator
                ]
                const query = `INSERT INTO channels_by_id(${this.channel_columns}) VALUES (?,?,?,?,?,?)`;
                const query_result = await client.execute(query, params, {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    remove(id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `DELETE FROM channels_by_id WHERE id_channel = ?`;
                const query_result = await client.execute(query, [id_channel], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    update(id_channel:string, data:IChannel|{[key:string]:any}):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const cols = Object.keys(data).map(dat=>(`${dat} = ?`)).join(', ');
                const query = `UPDATE channels_by_id SET ${cols} WHERE id_channel = ?`;
                const query_result = await client.execute(query, {...data, id_channel}, {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

}

export default new Channel();