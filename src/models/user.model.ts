import { IUsers_by_id } from './../interfaces/cassandra_interfaces/IUser';
import client from "../database/cassandra.db.js";
import { types } from "cassandra-driver";

class User{

    private user_columns:string

    constructor() {
        this.user_columns = 'id_user, username, custom_username, email, password, register_date';
    }

    find_by_id(id_user:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.user_columns} FROM users_by_id WHERE id_user = ?`;
                const query_result = await client.execute(query, [id_user], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    find_by_username(username:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.user_columns} FROM users_by_username WHERE username = ?`;
                const query_result = await client.execute(query, [username], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    find_by_email(email:string):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const query = `SELECT ${this.user_columns} FROM users_by_email WHERE email = ?`;
                const query_result = await client.execute(query, [email], {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }

    insert(data: IUsers_by_id):Promise<types.ResultSet>{
        return new Promise(async(res, rej)=>{
            try{
                const params = [
                    data.id_user, data.username, data.custom_username, data.email,
                    data.password, data.register_date    
                ];
                const query = `INSERT INTO users_by_id(${this.user_columns}) VALUES (?,?,?,?,?,?)`;
                const query_result = await client.execute(query, params, {prepare: true});
                res(query_result);
            }catch(error){
                rej(error);
            }
        });
    }
}

export default new User();