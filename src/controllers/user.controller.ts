import { IUsers_by_id } from './../interfaces/cassandra_interfaces/IUser';
import userModel from "../models/user.model.js";
import { Request, Response } from "express";
import bc from 'bcrypt';
import jwt from 'jsonwebtoken';
import id_generator from '../utils/id_generator.js';

const get_user_by_email_username = async (req: Request, res: Response)=>{
    try{
        const {email, username} = req.query;
        if(email){
            var response = await userModel.find({email});
        }else if(username){
            var response = await userModel.find({username});
        }else{
            return res.status(400).json({succes: false, error: 2, message: "Invalidad data form"}); 
        }
        const data = response.first();
        if(data){
            res.status(200).json({succes: true, error: 0, data});
        }else{
            res.status(404).json({succes: false, error: 3, message: "User not found"});
        }
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const get_user_by_id = async (req: Request, res: Response)=>{
    try{
        const {id_user} = req.params;
        const response = await userModel.find({id_user});
        const data = response.first();
        if(data){
            res.status(200).json({succes: true, error: 0, data});
        }else{
            res.status(404).json({succes: false, error: 2, message: "User not found"});
        }
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const login = async (req: Request, res: Response)=>{
    try{
        const {id_user, username, email, password} = req.body;
        if(id_user){
            var response = await userModel.find({id_user});
        }else if(username){
            var response = await userModel.find({username});
        }else if(email){
            var response = await userModel.find({email});
        }else{
            return res.status(404).json({succes: false, error: 2, message: "Invalidad data form"});
        }
        const data: IUsers_by_id = response.first();
        if(data){
            let math = await bc.compare(password, data.password);
            if(math){
                var token = jwt.sign(data, process.env.JWT_SECRET!);
                return res.status(200).json({succes: true, error: 0, token});
            }else{
                return res.status(401).json({succes: false, error: 3, message: "Invalid credentials"});
            }
        }else{
            return res.status(401).json({succes: false, error: 3, message: "Invalid credentials"});
        }
    }catch(error){
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

const register = async (req: Request, res: Response)=>{
    try{
        const {username, custom_username, email, password} = req.body;
        if(username){
            let _data = await userModel.find({username});
            if(_data.first()){
                return res.status(400).json({succes: false, error: 2, message: "Username already taken"});
            }
        }else{
            return res.status(400).json({succes: false, error: 3, message: "incomplete data"});
        }
        if(email){
            let _data = await userModel.find({email});
            if(_data.first()){
                return res.status(400).json({succes: false, error: 2, message: "Email already taken"});
            }
        }else{
            return res.status(400).json({succes: false, error: 3, message: "incomplete data"});
        }
        const date_now = Date.now();
        const password_hash = await bc.hash(password, 10);
        const user_data = {
            id_user: id_generator(date_now),
            username,
            custom_username: custom_username||username,
            email,
            register_date: date_now
        }
        await userModel.insert({...user_data, password: password_hash});
        const token = jwt.sign(user_data, process.env.JWT_SECRET!);
        res.status(200).json({succes: true, error: 0, token});
    }catch(error){
        console.log(error);
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
} 

const auth = async (req: Request, res: Response)=>{
    try{
        if(res.locals.user){
            res.status(200).json({succes: true, error: 0, user: res.locals.user});
        }else{
            res.status(401).json({succes: false, error: 0, user: "Invalid authentication"});
        }
    }catch(error){
        console.log(error);
        res.status(400).json({succes: false, error: 1, message: (error as Error).message});
    }
}

export default {
    get_user_by_email_username,
    get_user_by_id,
    login,
    register,
    auth
}