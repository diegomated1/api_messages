import { IMessage } from "interfaces/cassandra_interfaces/IMessage";
import { IErr_data, IErr_msg } from "interfaces/others/IPromise_response";
import client from "../database/cassandra.db.js";
import {Client, types} from 'cassandra-driver';
import { mapping } from "cassandra-driver";


class Message{
    private message_columns:String

    constructor(){
        this.message_columns = 'id_message, id_channel, create_at, content, id_author';
    }

    find_by_id(id_message:string,id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.message_columns} FROM messages_by_id WHERE id_message = ? AND id_channel = ?`;
                const query_result = await client.execute(query, [id_message, id_channel]);
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    find_by_channel(id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.message_columns} FROM messages_by_channel WHERE id_channel = ?`;
                const query_result = await client.execute(query, [id_channel]);
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    insert(data:IMessage):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const params = [
                    data.id_message, data.id_channel, data.create_at, data.content, data.id_author
                ];
                const queries = [
                    {
                        query: `INSERT INTO messages_by_id(${this.message_columns}) VALUES (?,?,?,?,?)`, params
                    },{
                        query: `INSERT INTO messages_by_channel(${this.message_columns}) VALUES (?,?,?,?,?)`, params
                    }
                ]
                const query_result = await client.batch(queries, {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    remove(id_message:string,id_channel:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const queries = [
                    {
                        query: `DELETE FROM messages_by_id WHERE id_message = ? AND id_channel = ?`,
                        params: [id_message, id_channel]
                    },{
                        query: `DELETE FROM messages_by_channel WHERE id_channel = ? AND id_message = ?`,
                        params: [id_channel, id_message]
                    }
                ]
                const query_result = await client.batch(queries, {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    update(id_message:string, id_channel:string, create_at:string, content:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const queries = [
                    {
                        query: 'UPDATE messages_by_id SET content = ? WHERE id_message = ? AND id_channel = ? AND create_at = ?',
                        params: [content, id_message, id_channel, create_at]
                    },{
                        query: 'UPDATE messages_by_channel SET content = ? WHERE id_channel = ? AND id_message = ? AND create_at = ?',
                        params: [content, id_channel, id_message, create_at]
                    }
                ]
                const query_result = await client.batch(queries, {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

}

export default new Message();